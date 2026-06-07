import type { PropsWithChildren, ReactNode } from "react";
import type { RoutePath } from "@shared/routes"; // Убедитесь, что путь импорта верный

export type BentoItemProps = PropsWithChildren & {
  heading?: ReactNode;
  headingIcon?: ReactNode;
  marginMode?: 'large' | 'compact';
  className?: string;
  headerClassName?: string;
  to?: RoutePath;
  href?: string; // <-- Новое свойство для внешних ссылок
};
