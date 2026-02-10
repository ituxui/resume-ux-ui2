import { type FC } from 'react';
import cn from 'classnames';
import type { TableSectionProps } from './Table.types';
import { RegionProvider } from './TableContext';
import styles from './Table.module.scss';

export const TableBody: FC<TableSectionProps> = ({ children, className }) => {
  return (
    <RegionProvider value="body">
      <tbody className={cn(styles.tbody, className)}>{children}</tbody>
    </RegionProvider>
  );
};
