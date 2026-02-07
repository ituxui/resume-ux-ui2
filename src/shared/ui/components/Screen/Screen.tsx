import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import styles from './Screen.module.scss';
import { useScrollImage } from './hooks/useScrollImage';
import { useLazyLoad } from './hooks/useLazyLoad';

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

export type ScreenSize = '1/3' | '2/3' | '3/3';
export type ScreenMode = 'default' | 'gallery' | 'full';
export type ScreenScroll = 'static' | 'parallax';

export interface ScreenProps {
  src: string;
  alt?: string;
  size?: ScreenSize;
  mode?: ScreenMode;
  scroll?: ScreenScroll;
  scrollStartThreshold?: number;
  scrollEndThreshold?: number;
  lazyThreshold?: number;
  /** Описание под скриншотом */
  postfix?: ReactNode;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

export const Screen = ({
  src,
  alt = 'Screenshot',
  size = '1/3',
  mode = 'default',
  scroll = 'static',
  scrollStartThreshold = 20,
  scrollEndThreshold = 60,
  lazyThreshold = 100,
  postfix,
  className,
}: ScreenProps) => {
  const isParallax = scroll === 'parallax';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Ленивая загрузка
  const {
    containerRef: lazyContainerRef,
    shouldLoad,
    isLoaded,
    setIsLoaded,
  } = useLazyLoad({ threshold: lazyThreshold });

  // 2. Параллакс скролл (внутри карточки)
  const {
    containerRef: scrollContainerRef,
    imageRef,
    scrollProgress,
  } = useScrollImage({
    enabled: isParallax && isLoaded,
    startThreshold: scrollStartThreshold,
    endThreshold: scrollEndThreshold,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Объединяем рефы
  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      // @ts-ignore
      lazyContainerRef.current = element;
      // @ts-ignore
      scrollContainerRef.current = element;
    }
  }, [lazyContainerRef, scrollContainerRef]);

  // 3. Логика модального окна (размеры и буфер)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isModalOpen) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isModalOpen]);

  const boundaryBuffer = useMemo(() => {
    const xBuffer = Math.min(windowSize.width * 0.1, 50);
    const yBuffer = Math.min(windowSize.height * 0.1, 50);
    return { x: xBuffer, y: yBuffer };
  }, [windowSize]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // 4. Логика параллакса
  const [canScroll, setCanScroll] = useState(false);
  const [imageOverflow, setImageOverflow] = useState(0);

  const handleImageLoad = () => {
    setIsLoaded(true);

    if (isParallax && imageRef.current && containerRef.current) {
      const container = containerRef.current;
      const image = imageRef.current;

      const containerHeight = container.clientHeight;
      const imageNaturalHeight = image.naturalHeight;
      const imageNaturalWidth = image.naturalWidth;
      const containerWidth = container.clientWidth;

      const scaledImageHeight = (containerWidth / imageNaturalWidth) * imageNaturalHeight;
      const overflow = scaledImageHeight - containerHeight;

      setImageOverflow(Math.max(0, overflow));
      setCanScroll(overflow > 0);
    }
  };

  const getImageTransform = () => {
    if (!isParallax || !canScroll) {
      return 'translateY(0)';
    }
    const translateY = -scrollProgress * imageOverflow;
    return `translateY(${translateY}px)`;
  };

  const sizeClassMap: Record<ScreenSize, string> = {
    '1/3': styles.sizeOneThird,
    '2/3': styles.sizeTwoThirds,
    '3/3': styles.sizeThreeThirds,
  };

  const screenClasses = cn(
    styles.screen,
    sizeClassMap[size],
    styles[`mode_${mode}`],
    {
      [styles.parallax]: isParallax,
      [styles.loading]: !isLoaded && shouldLoad,
    },
    className
  );

  const wrapperClasses = cn(
    styles.wrapper,
    sizeClassMap[size],
    styles[`mode_${mode}`]
  );

  const imageStyle = isParallax
    ? { transform: getImageTransform() }
    : undefined;

  const hasPostfix = Boolean(postfix);

  // Если есть postfix — оборачиваем в wrapper
  const screenContent = (
    <div ref={containerRef} className={screenClasses}>
      {(!isLoaded && shouldLoad) && (
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

      {shouldLoad && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={cn(styles.image, {
            [styles.imageVisible]: isLoaded,
          })}
          style={imageStyle}
          onLoad={handleImageLoad}
          onClick={() => setIsModalOpen(true)}
        />
      )}

      {!shouldLoad && <div className={styles.placeholder} />}
    </div>
  );

  return (
    <>
      {hasPostfix ? (
        <div className={wrapperClasses}>
          {screenContent}
          <div className={styles.postfix}>{postfix}</div>
        </div>
      ) : (
        screenContent
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <>
          <div className={styles.modalOverlay}

            onClick={(e) => {
              const x = e.clientX;
              const y = e.clientY;

              // Находим изображение внутри модалки
              const img = document.querySelector(`.${styles.modalImage}`) as HTMLImageElement | null;

              let isOverImage = false;

              if (img) {
                const rect = img.getBoundingClientRect();
                // Проверяем, попадает ли клик внутрь изображения
                if (
                  x >= rect.left &&
                  x <= rect.right &&
                  y >= rect.top &&
                  y <= rect.bottom
                ) {
                  isOverImage = true;
                }
              }

              const isOverControls =
                e.target instanceof Element &&
                (e.target.closest(`.${styles.closeButton}`) ||
                  e.target.closest(`.${styles.zoomControls}`) ||
                  e.target.closest(`.${styles.hint}`));

              if (!isOverImage && !isOverControls) {
                setIsModalOpen(false);
              }
            }}
          >


            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Закрыть"
            >
              <span className={styles.closeIcon} />
            </button>

            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={5}
              limitToBounds={true}
              centerZoomedOut={true}
              alignmentAnimation={{ sizeX: 0, sizeY: 0, velocityAlignmentTime: 400 }}
              wheel={{ step: 0.1 }}
              doubleClick={{ mode: 'toggle', step: 2 }}
              panning={{ velocityDisabled: false }}

            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>

                  <div className={styles.zoomControls}>
                    <button onClick={() => zoomIn()} className={styles.zoomButton}>
                      +
                    </button>
                    <button onClick={() => zoomOut()} className={styles.zoomButton}>
                      −
                    </button>
                    <button onClick={() => resetTransform()} className={styles.zoomButton}>
                      ↺
                    </button>
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
                    <img
                      src={src}
                      alt={alt}
                      className={styles.modalImage}
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>

            <div className={styles.hint}>
              Колёсико мыши для зума • Двойной клик для увеличения • Esc для закрытия
            </div>
          </div>
        </>
      )}
    </>
  );
};
