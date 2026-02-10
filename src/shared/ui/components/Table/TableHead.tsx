import { type FC } from 'react';
import cn from 'classnames';
import type { TableSectionProps } from './Table.types';
import { RegionProvider } from './TableContext';
import styles from './Table.module.scss';

export const TableHead: FC<TableSectionProps> = ({ children, className }) => {
  return (
    <RegionProvider value="head">
      <thead className={cn(styles.thead, className)}>{children}</thead>
    </RegionProvider>
  );
};
