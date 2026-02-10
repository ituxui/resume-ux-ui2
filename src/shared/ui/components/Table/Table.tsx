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
  colorScheme = 'default',
  size = 'md',
  className,
}) => {
  return (
    <TableProvider
      value={{ stickyHeader, stickyFooter, stickyColumns, size, colorScheme }}
    >
      <div className={cn(styles.wrapper, className)}>
        <table
          className={cn(
            styles.table,
            styles[`size-${size}`],
            styles[`scheme-${colorScheme}`],
          )}
        >
          {children}
        </table>
      </div>
    </TableProvider>
  );
};
