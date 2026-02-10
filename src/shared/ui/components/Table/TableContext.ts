import { createContext, useContext } from 'react';
import type { TableSize, TableColorScheme, TableRegion } from './Table.types';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface TableContextValue {
  stickyHeader: boolean;
  stickyFooter: boolean;
  stickyColumns: number;
  size: TableSize;
  colorScheme: TableColorScheme;
}

const TableContext = createContext<TableContextValue>({
  stickyHeader: false,
  stickyFooter: false,
  stickyColumns: 0,
  size: 'md',
  colorScheme: 'default',
});

export const TableProvider = TableContext.Provider;
export const useTableContext = () => useContext(TableContext);

// ═══════════════════════════════════════════════════════════════════════════
// REGION (head / body / foot)
// ═══════════════════════════════════════════════════════════════════════════

const RegionContext = createContext<TableRegion>('body');

export const RegionProvider = RegionContext.Provider;
export const useRegion = () => useContext(RegionContext);
