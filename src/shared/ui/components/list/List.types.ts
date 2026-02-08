import { type ReactNode } from 'react';

export type ListRole = 'body' | 'person';

export interface ListProps {
  ordered?: boolean;
  className?: string;
  children: ReactNode;
  role?: ListRole;
}

export interface ListItemProps {
  className?: string;
  children: ReactNode;
}
