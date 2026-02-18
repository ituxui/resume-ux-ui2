import { useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import type { ReactNode } from 'react';
import styles from './Book.module.scss';
import { Tooltip } from '@components';

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
  /** @deprecated Больше не используется, оставлено для совместимости */
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
}: BookProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const content = (
    <div
      ref={containerRef}
      className={cn(
        styles.book,
        styles[`size--${size}`],
        { [styles.loading]: !isLoaded },
        className
      )}
    >
      {/* Скелетон показываем, пока картинка не загрузилась */}
      {!isLoaded && (
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

      {/* Картинка рендерится сразу с loading="lazy" */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async" fetchPriority="low"
        className={cn(styles.image, {
          [styles.imageVisible]: isLoaded,
        })}
        onLoad={handleImageLoad}
      />
    </div>
  );

  // Если есть children и картинка загружена — оборачиваем в Tooltip
  if (children && isLoaded) {
    return (
      <Tooltip content={children} disabled={!isLoaded}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
