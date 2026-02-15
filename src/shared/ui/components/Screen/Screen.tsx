import { useState, useEffect, useRef, useMemo, useCallback, type ReactNode } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import styles from './Screen.module.scss';
import { useScrollImage } from './hooks/useScrollImage';
import { useLazyLoad } from './hooks/useLazyLoad';
import { Text } from '../Text/Text';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ScreenSize = '1/3' | '2/3' | '3/3';
export type ScreenScroll = 'static' | 'parallax';

export interface ScreenProps {
  src: string;
  alt?: string;
  size?: ScreenSize;
  scroll?: ScreenScroll;
  lazyThreshold?: number;
  postfix?: ReactNode;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const SIZE_CLASS_MAP: Record<ScreenSize, string> = {
  '1/3': styles.sizeOneThird,
  '2/3': styles.sizeTwoThirds,
  '3/3': styles.sizeThreeThirds,
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Screen = ({
  src,
  alt = 'Screenshot',
  size = '1/3',
  scroll = 'static',
  lazyThreshold = 300,
  postfix,
  className,
}: ScreenProps) => {
  const isParallax = scroll === 'parallax';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ─── Lazy Load ─────────────────────────────────────────────────
  const {
    containerRef: lazyContainerRef,
    shouldLoad,
    isLoaded,
    setIsLoaded,
  } = useLazyLoad({ threshold: lazyThreshold });

  // ─── Parallax ──────────────────────────────────────────────────
  const {
    containerRef: scrollContainerRef,
    imageRef,
  } = useScrollImage({ enabled: isParallax && isLoaded });

  // ─── Shared ref ────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      lazyContainerRef.current = el;
      scrollContainerRef.current = el;
    }
  }, [lazyContainerRef, scrollContainerRef]);

  // ─── Modal: window size ────────────────────────────────────────
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (!isModalOpen) return;
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isModalOpen]);

  const boundaryBuffer = useMemo(() => ({
    x: Math.min(windowSize.width * 0.1, 50),
    y: Math.min(windowSize.height * 0.1, 50),
  }), [windowSize]);

  // ─── Modal: body lock + esc ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  // ─── Handlers ──────────────────────────────────────────────────
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const handleImageLoad = useCallback(() => setIsLoaded(true), [setIsLoaded]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as Element;

    // Клик по картинке — не закрывать
    const img = document.querySelector(`.${styles.modalImage}`);
    if (img) {
      const r = img.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) return;
    }

    // Клик по контролам — не закрывать
    if (target.closest(`.${styles.closeButton}`) || target.closest(`.${styles.zoomControls}`)) return;

    closeModal();
  }, [closeModal]);

  // ─── Data attribute ────────────────────────────────────────────
  const dataSize = { 'data-screen-size': size };

  // ─── Render ────────────────────────────────────────────────────
  return (
    <>
      <div
        className={cn(styles.wrapper, SIZE_CLASS_MAP[size], className)}
        {...dataSize}
      >
        {/* Screen container */}
        <div
          ref={containerRef}
          className={cn(styles.screen, {
            [styles.parallax]: isParallax,
            [styles.loading]: !isLoaded && shouldLoad,
          })}
          {...dataSize}
        >
          {/* Skeleton */}
          {!isLoaded && shouldLoad && (
            <div className={styles.skeleton}>
              <Skeleton
                height="100%"
                width="100%"
                baseColor="rgba(0, 0, 0, 0.06)"
                highlightColor="rgba(0, 0, 0, 0.03)"
                borderRadius={0}
                duration={1.5}
              />
            </div>
          )}

          {/* Image */}
          {shouldLoad && (
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className={cn(styles.image, { [styles.imageVisible]: isLoaded })}
              onLoad={handleImageLoad}
              onClick={openModal}
            />
          )}

          {/* Placeholder (before lazy threshold) */}
          {!shouldLoad && <div className={styles.placeholder} />}
        </div>

        {/* Postfix */}
        {postfix && (
          <Text role="caption" className={styles.postfix}>{postfix}</Text>
        )}
      </div>

      {/* ─── Zoom Modal ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <button className={styles.closeButton} onClick={closeModal} aria-label="Закрыть">
            <span className={styles.closeIcon} />
          </button>

          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={5}
            limitToBounds
            centerZoomedOut
            alignmentAnimation={{ sizeX: 0, sizeY: 0, velocityAlignmentTime: 400 }}
            wheel={{ step: 0.1 }}
            doubleClick={{ mode: 'toggle', step: 2 }}
            panning={{ velocityDisabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className={styles.zoomControls}>
                  <button onClick={() => zoomIn()} className={styles.zoomButton}>+</button>
                  <button onClick={() => zoomOut()} className={styles.zoomButton}>−</button>
                  <button onClick={() => resetTransform()} className={styles.zoomButton}>↺</button>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: `calc(100vw + ${boundaryBuffer.x * 2}px)`,
                    height: `calc(100vh + ${boundaryBuffer.y * 2}px)`,
                    marginLeft: `-${boundaryBuffer.x}px`,
                    marginTop: `-${boundaryBuffer.y}px`,
                  }}
                  contentStyle={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={src} alt={alt} className={styles.modalImage} />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          <div className={styles.hint}>
            Колёсико мыши для зума • Двойной клик для увеличения • Esc для закрытия
          </div>
        </div>
      )}
    </>
  );
};
