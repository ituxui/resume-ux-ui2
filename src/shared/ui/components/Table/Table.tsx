// src/shared/ui/components/Table/Table.tsx

import { type FC } from 'react';
import cn from 'classnames';
import type { TableProps } from './Table.types';
import { TableProvider } from './TableContext';
import styles from './Table.module.scss';

export const Table: FC<TableProps> = ({
  children,
  stickyHeader = false,
  stickyFooter = false,
  stickyColumns = 0,
  size = 'md',
  className,
}) => {
  return (
    <TableProvider
      value={{ stickyHeader, stickyFooter, stickyColumns, size }}
    >
      {/* Внешняя рамка (border + radius) */}
      <div className={cn(styles.wrapper, className)}>
        {/* Скролл-контейнер */}
        <div className={styles.scrollContainer}>
          <table
            className={cn(
              styles.table,
              styles[`size-${size}`]
            )}
          >
            {children}
          </table>
        </div>
      </div>
    </TableProvider>
  );
};
