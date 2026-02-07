import { useState, useRef, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import type { ReactNode } from 'react';
import styles from './Pictogram.module.scss';
import { Tooltip } from '@components';

type PictogramSize = 'sm' | 'md';
type PictogramFace = 'empty' | 'island';

export interface PictogramProps {
  /** URL картинки из public */
  src: string;
  /** Альтернативный текст */
  alt?: string;
  /** Размер: sm = 40px, md = 96px */
  size?: PictogramSize;
  /** Внешний вид: empty (без стилей), island (карточка с тенью) */
  face?: PictogramFace;
  /** Текст всплывающей подсказки */
  children?: ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Порог загрузки в vh от верха viewport */
  lazyThreshold?: number;
}

const sizeMap: Record<PictogramSize, number> = {
  sm: 40,
  md: 96,
};

const tooltipSizeMap: Record<PictogramSize, 'sm' | 'md'> = {
  sm: 'sm',
  md: 'md',
};

export const Pictogram = ({
  src,
  alt = '',
  size = 'md',
  face = 'empty',
  children,
  className,
  lazyThreshold = 100,
}: PictogramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastCallRef = useRef(0);
  const rafRef = useRef<number | null>(null);

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

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const pixelSize = sizeMap[size];
  const isLoading = shouldLoad && !isLoaded;

  const content = (
    <div
      ref={containerRef}
      className={cn(
        styles.pictogram,
        styles[`size--${size}`],
        styles[`face--${face}`],
        { [styles.loading]: isLoading },
        className
      )}
    >
      {/* Скелетон */}
      {isLoading && (
        <div className={styles.skeleton}>
          <Skeleton
            width={pixelSize}
            height={pixelSize}
            baseColor="rgba(255, 255, 255, 0.08)"
            highlightColor="rgba(255, 255, 255, 0.15)"
            borderRadius={face === 'island' ? 16 : 8}
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
          className={cn(styles.image, {
            [styles.imageVisible]: isLoaded,
          })}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );

  // Если есть children и картинка загружена — оборачиваем в Tooltip
  if (children && isLoaded) {
    return (
      <Tooltip content={children} size={tooltipSizeMap[size]} disabled={isLoading}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
