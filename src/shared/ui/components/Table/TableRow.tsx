import { type FC, Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';
import type { TableRowProps } from './Table.types';
import styles from './Table.module.scss';

export const TableRow: FC<TableRowProps> = ({
  children,
  highlighted = false,
  className,
}) => {
  // Прокидываем cellIndex каждому ребёнку
  const cells = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ _cellIndex?: number }>, {
        _cellIndex: index,
      });
    }
    return child;
  });

  return (
    <tr
      className={cn(styles.tr, { [styles.highlighted]: highlighted }, className)}
    >
      {cells}
    </tr>
  );
};
