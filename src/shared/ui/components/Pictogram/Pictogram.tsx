import { useState, useRef } from 'react';
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
  /** @deprecated Больше не используется */
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
}: PictogramProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const pixelSize = sizeMap[size];

  const content = (
    <div
      ref={containerRef}
      className={cn(
        styles.pictogram,
        styles[`size--${size}`],
        styles[`face--${face}`],
        { [styles.loading]: !isLoaded },
        className
      )}
    >
      {/* Скелетон */}
      {!isLoaded && (
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

      {/* Картинка */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
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
      <Tooltip content={children} size={tooltipSizeMap[size]} disabled={!isLoaded}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
