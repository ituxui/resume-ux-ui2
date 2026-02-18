import type { PropsWithChildren, ReactNode } from "react";
import type { RoutePath } from "@shared/routes"; // Убедитесь, что путь импорта верный

export type BentoItemProps = PropsWithChildren & {
  heading?: ReactNode;
  headingIcon?: ReactNode;
  marginMode?: 'large' | 'compact';
  className?: string;
  to?: RoutePath; // Новое свойство
};
