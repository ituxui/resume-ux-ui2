import { type FC, type ReactNode } from 'react';
import cn from 'classnames';
import styles from './CompetitorCells.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Advantage: FC<Props> = ({ children, className }) => {
  if (!children) return null;

  return (
    <div className={cn(styles.wrapper, className)}>
      <span className={cn(styles.title, styles.advantage)}>+ Преимущества</span>
      {children}
    </div>
  );
};
