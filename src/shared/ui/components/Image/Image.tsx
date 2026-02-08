import { useState, useRef, useEffect, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import styles from './Image.module.scss';

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

export interface ImageProps {
  src: string;
  alt?: string;
  /** Порог загрузки в vh от верха viewport */
  lazyThreshold?: number;
  /** Включить zoom по клику */
  zoomable?: boolean;
  /** Скругление углов */
  /** Дополнительный класс (для размеров) */
  className?: {
    container?: string;
    image?: string;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

export const Image = ({
  src,
  alt = 'Image',
  lazyThreshold = 200,
  zoomable = true,
  className,
}: ImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastCallRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // LAZY LOAD
  // ═══════════════════════════════════════════════════════════════════════════

  const checkPosition = useCallback(() => {
    if (shouldLoad) return;

    const now = Date.now();
    if (now - lastCallRef.current < 100) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkPosition);
      return;
    }
    lastCallRef.current = now;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const distanceVh = (rect.top / viewportHeight) * 100;

    if (distanceVh < lazyThreshold) {
      setShouldLoad(true);
    }
  }, [shouldLoad, lazyThreshold]);

  useEffect(() => {
    if (shouldLoad) return;

    checkPosition();

    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldLoad, checkPosition]);

  // ═══════════════════════════════════════════════════════════════════════════
  // MODAL
  // ═══════════════════════════════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (zoomable && isLoaded) {
      setIsModalOpen(true);
    }
  };

  const isLoading = shouldLoad && !isLoaded;


  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          styles.container,
          {
            [styles.loading]: isLoading,
            [styles.zoomable]: zoomable && isLoaded,
          },
          className?.container
        )}
      >
        {/* Скелетон */}
        {isLoading && (
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

        {/* Placeholder до начала загрузки */}
        {!shouldLoad && <div className={styles.placeholder} />}

        {/* Картинка */}
        {shouldLoad && (
          <img
            src={src}
            alt={alt}
            className={cn(
              styles.image,
              {
                [styles.imageVisible]: isLoaded,
              },
              className?.image)}
            onLoad={handleImageLoad}
            onClick={handleClick}
          />
        )}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
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
                    width: '100vw',
                    height: '100vh',
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
      )}
    </>
  );
};
