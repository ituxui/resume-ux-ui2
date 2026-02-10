import { type FC } from 'react';
import cn from 'classnames';
import type { TableSectionProps } from './Table.types';
import { RegionProvider } from './TableContext';
import styles from './Table.module.scss';

export const TableFoot: FC<TableSectionProps> = ({ children, className }) => {
  return (
    <RegionProvider value="foot">
      <tfoot className={cn(styles.tfoot, className)}>{children}</tfoot>
    </RegionProvider>
  );
};
