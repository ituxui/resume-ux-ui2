// src/shared/ui/components/Table/TableContext.ts

import { createContext, useContext } from 'react';
import type { TableSize, TableRegion } from './Table.types';

// ═══════════════════════════════════════════════════════════════════════════
// TABLE CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface TableContextValue {
  stickyHeader: boolean;
  stickyFooter: boolean;
  stickyColumns: number;
  size: TableSize;
}

const TableContext = createContext<TableContextValue>({
  stickyHeader: false,
  stickyFooter: false,
  stickyColumns: 0,
  size: 'md',
});

export const TableProvider = TableContext.Provider;
export const useTableContext = () => useContext(TableContext);

// ═══════════════════════════════════════════════════════════════════════════
// REGION (head / body / foot)
// ═══════════════════════════════════════════════════════════════════════════

const RegionContext = createContext<TableRegion>('body');

export const RegionProvider = RegionContext.Provider;
export const useRegion = () => useContext(RegionContext);
