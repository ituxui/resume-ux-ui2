import { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import styles from './Image.module.scss';

export interface ImageProps {
  src: string;
  alt?: string;
  /** @deprecated Больше не используется, оставлено для совместимости */
  lazyThreshold?: number;
  /** Включить zoom по клику */
  zoomable?: boolean;
  /** Дополнительный класс (для размеров) */
  className?: {
    container?: string;
    image?: string;
  };
}

export const Image = ({
  src,
  alt = 'Image',
  zoomable = true,
  className,
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // MODAL
  // ═══════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (zoomable && isLoaded) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          styles.container,
          {
            [styles.loading]: !isLoaded,
            [styles.zoomable]: zoomable && isLoaded,
          },
          className?.container
        )}
      >
        {/* Скелетон */}
        {!isLoaded && (
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

        {/* Картинка */}
        <img
          src={src}
          alt={alt}
          className={cn(
            styles.image,
            { [styles.imageVisible]: isLoaded },
            className?.image
          )}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onClick={handleClick}
        />
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            const target = e.target as Element;
            // Проверка клика по картинке или контролам
            const isImage = target.classList.contains(styles.modalImage);
            const isControl = target.closest(`.${styles.closeButton}`) ||
              target.closest(`.${styles.zoomControls}`) ||
              target.closest(`.${styles.hint}`);

            if (!isImage && !isControl) {
              setIsModalOpen(false);
            }
          }}
        >
          <button className={styles.closeButton} onClick={() => setIsModalOpen(false)} aria-label="Закрыть">
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
                  <button onClick={() => zoomIn()} className={styles.zoomButton}>+</button>
                  <button onClick={() => zoomOut()} className={styles.zoomButton}>−</button>
                  <button onClick={() => resetTransform()} className={styles.zoomButton}>↺</button>
                </div>
                <TransformComponent
                  wrapperStyle={{ width: '100vw', height: '100vh' }}
                  contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img src={src} alt={alt} className={styles.modalImage}
                    loading="lazy"
                    decoding="async"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          <div className={styles.hint}>Колёсико мыши для зума • Двойной клик для увеличения • Esc для закрытия</div>
        </div>
      )}
    </>
  );
};
