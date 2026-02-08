import { useState, useRef, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import type { ReactNode } from 'react';
import styles from './Book.module.scss';
import { Tooltip } from '@shared/ui/sections';

type BookSize = 'free' | 'md';

export interface BookProps {
  /** URL обложки книги из public */
  src: string;
  /** Альтернативный текст */
  alt?: string;
  /** Размер: free = задаётся через className, md = 96px ширина */
  size?: BookSize;
  /** Текст всплывающей подсказки */
  children?: ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Порог загрузки в vh от верха viewport */
  lazyThreshold?: number;
}

const ASPECT_RATIO = 84 / 122;
const MD_WIDTH = 96;
const MD_HEIGHT = Math.round(MD_WIDTH / ASPECT_RATIO);

export const Book = ({
  src,
  alt = '',
  size = 'md',
  children,
  className,
  lazyThreshold = 100,
}: BookProps) => {
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

  const isLoading = shouldLoad && !isLoaded;

  const content = (
    <div
      ref={containerRef}
      className={cn(
        styles.book,
        styles[`size--${size}`],
        { [styles.loading]: isLoading },
        className
      )}
    >
      {/* Скелетон */}
      {isLoading && (
        <div className={styles.skeleton}>
          <Skeleton
            width={size === 'md' ? MD_WIDTH : '100%'}
            height={size === 'md' ? MD_HEIGHT : '100%'}
            baseColor="rgba(255, 255, 255, 0.08)"
            highlightColor="rgba(255, 255, 255, 0.15)"
            borderRadius={3}
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
      <Tooltip content={children} disabled={isLoading}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
