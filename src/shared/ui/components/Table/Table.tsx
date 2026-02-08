import { type FC } from 'react';
import cn from 'classnames';
import type { TableProps, TableCellData } from './Table.types';
import styles from './Table.module.scss';
import { Text } from '@shared/ui/sections';

const resolveCell = (value: TableCellData | string): TableCellData => {
  if (typeof value === 'string') return { title: value };
  return value;
};

export const Table: FC<TableProps> = ({
  columns,
  rows,
  className,
  stickyHeader = false,
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <table
        className={cn(styles.table, { [styles.stickyHeader]: stickyHeader })}
      >
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.th}
                style={col.width ? { width: col.width } : undefined}
              >
                <Text role="table-th">
                  {col.header}
                </Text>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={styles.tr}>
              {columns.map((col) => {
                const cell = resolveCell(row[col.key] ?? '');
                return (
                  <td key={col.key} className={styles.td}>
                    <div className={styles.cellContent}>
                      <Text role="table-td">{cell.title}</Text>
                      {cell.subtitle && (
                        <Text role="table-td" colorScheme="muted">
                          {cell.subtitle}
                        </Text>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
