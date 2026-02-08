import { type FC } from 'react';
import cn from 'classnames';
import type { ListProps } from './List.types';
import { ListProvider } from './ListContext';
import styles from './List.module.scss';

export const List: FC<ListProps> = ({ ordered = false, className, children, role = 'body' }) => {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <ListProvider value={role}>
      <Tag
        className={cn(
          styles.list,
          ordered ? styles.ordered : styles.unordered,
          styles[`role-${role}`],
          className
        )}
      >
        {children}
      </Tag>
    </ListProvider>
  );
};
