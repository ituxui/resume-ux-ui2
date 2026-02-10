import { type FC } from 'react';
import cn from 'classnames';
import { Text } from '../Text/Text';
import type { TableCellProps } from './Table.types';
import { useTableContext, useRegion } from './TableContext';
import styles from './Table.module.scss';

interface InternalProps extends TableCellProps {
  _cellIndex?: number;
}

export const TableCell: FC<InternalProps> = ({
  children,
  as,
  colSpan,
  rowSpan,
  align = 'left',
  valign = 'top',
  sticky,
  width,
  minWidth,
  className,
  _cellIndex = 0,
}) => {
  const { stickyHeader, stickyFooter, stickyColumns } = useTableContext();
  const region = useRegion();

  // Определяем тег
  const Tag = as ?? (region === 'head' || region === 'foot' ? 'th' : 'td');

  // Text role
  const textRole = Tag === 'th' ? 'table-th' : 'table-td';

  // Sticky-логика
  const isStickyRow =
    sticky ??
    ((region === 'head' && stickyHeader) ||
      (region === 'foot' && stickyFooter));

  const isStickyCol = sticky ?? (_cellIndex < stickyColumns);

  const isCorner = isStickyRow && isStickyCol;

  // z-index
  let zIndex: number | undefined;
  if (isCorner) zIndex = 3;
  else if (isStickyRow) zIndex = 2;
  else if (isStickyCol) zIndex = 1;

  // inline styles
  const inlineStyle: React.CSSProperties = {};

  if (width) inlineStyle.width = width;
  if (minWidth) inlineStyle.minWidth = minWidth;
  if (zIndex) inlineStyle.zIndex = zIndex;


  return (
    <Tag
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        styles.cell,
        styles[`align-${align}`],
        styles[`valign-${valign}`],
        {
          [styles.th]: Tag === 'th',
          [styles.td]: Tag === 'td',
          [styles.stickyRow]: isStickyRow,
          [styles.stickyCol]: isStickyCol,
          [styles.stickyCorner]: isCorner,
        },
        className,
      )}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
    >
      <Text role={textRole}>
        {children}
      </Text>
    </Tag>
  );
};
