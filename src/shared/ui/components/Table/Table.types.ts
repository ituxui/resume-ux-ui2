import { type ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE
// ═══════════════════════════════════════════════════════════════════════════

export type TableSize = 'sm' | 'md' | 'lg';
export type TableColorScheme = 'default' | 'striped' | 'bordered';
export type TableRegion = 'head' | 'body' | 'foot';

export interface TableProps {
  children: ReactNode;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  stickyColumns?: number;
  colorScheme?: TableColorScheme;
  size?: TableSize;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface TableSectionProps {
  children: ReactNode;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ROW
// ═══════════════════════════════════════════════════════════════════════════

export interface TableRowProps {
  children: ReactNode;
  highlighted?: boolean;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CELL
// ═══════════════════════════════════════════════════════════════════════════

export interface TableCellProps {
  children?: ReactNode;
  as?: 'td' | 'th';
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  sticky?: boolean;
  width?: string;
  minWidth?: string;
  className?: string;
}
