// src/shared/ui/wrappers/Figure/Figure.tsx

import { type FC, type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Figure.module.scss';
import { Text } from '@components'; // Ваш компонент текста

interface FigureProps {
  children: ReactNode;
  /** Текст подписи снизу */
  caption?: ReactNode;
  className?: string;
}

export const Figure: FC<FigureProps> = ({ children, caption, className }) => {
  return (
    <figure className={cn(styles.figure, className)}>
      {/* Контент (Screen или Image) */}
      {children}

      {/* Подпись (если есть) */}
      {caption && (
        <figcaption className={styles.caption}>
          <Text role="caption">{caption}</Text>
        </figcaption>
      )}
    </figure>
  );
};
