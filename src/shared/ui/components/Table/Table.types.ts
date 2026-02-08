
export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

export interface TableCellData {
  title: string;
  subtitle?: string;
}

export type TableRowData = Record<string, TableCellData | string>;

export interface TableProps {
  columns: TableColumn[];
  rows: TableRowData[];
  className?: string;
  stickyHeader?: boolean;
}
