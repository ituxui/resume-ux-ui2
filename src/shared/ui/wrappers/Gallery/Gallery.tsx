import { type FC, type ReactNode, type MouseEvent } from 'react';
import cn from 'classnames';
import styles from './Gallery.module.scss';

export type GalleryColumns = 2 | 3;

interface GalleryProps {
  children: ReactNode;
  columns?: GalleryColumns;
  className?: string;
}

export const Gallery: FC<GalleryProps> = ({
  children,
  columns = 3,
  className,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(styles.gallery, styles[`cols-${columns}`], className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
