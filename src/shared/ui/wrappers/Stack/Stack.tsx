import { type FC, type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Stack.module.scss';

export type StackPage = 'landing' | 'article';
export type StackRole = 'section' | 'subsection' | 'subsubsection' | 'paragraph' | 'none';
export type StackWidth = 'text' | 'container' | 'full';

export interface StackProps {
  children: ReactNode;
  page: StackPage;
  role: StackRole;
  width?: StackWidth;
  as?: 'div' | 'section' | 'article';
  className?: string;
}

export const Stack: FC<StackProps> = ({
  children,
  page,
  role,
  width,
  as: Tag = 'div',
  className,
}) => {
  return (
    <Tag
      className={cn(
        styles.stack,
        styles[`${page}-${role}`],
        width && styles[`width-${width}`],
        className,
      )}
    >
      {children}
    </Tag>
  );
};
