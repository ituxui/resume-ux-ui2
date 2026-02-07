import type { PropsWithChildren, ReactNode } from "react";

export type BentoItemProps = PropsWithChildren & {
  heading?: ReactNode;
  headingIcon?: ReactNode;
  marginMode?: 'large' | 'compact';
  className?: string;
};
