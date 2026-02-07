import React, { type HTMLAttributes } from 'react';
import styles from './Nowrap.module.scss';

export interface NowrapProps extends HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const Nowrap = ({ children, className, ...props }: NowrapProps) => {
  const combinedClassName = [styles.nowrap, className].filter(Boolean).join(' ');

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};
