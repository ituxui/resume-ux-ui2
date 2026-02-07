import { type FC, type ReactNode, type MouseEvent } from 'react';
import cn from 'classnames';
import styles from './Gallery.module.scss';

interface GalleryProps {
  children: ReactNode;
  className?: string;
}

export const Gallery: FC<GalleryProps> = ({ children, className }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(styles.gallery, className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
