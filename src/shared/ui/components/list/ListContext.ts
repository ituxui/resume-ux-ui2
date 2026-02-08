import { createContext, useContext } from 'react';
import type { ListRole } from './List.types';

const ListContext = createContext<ListRole>('body');

export const ListProvider = ListContext.Provider;

export const useListRole = () => useContext(ListContext);
