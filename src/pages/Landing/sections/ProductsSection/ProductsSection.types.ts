import type { ScreenProps } from "@shared/ui/components";
import type { RoutePath } from "@shared/routes";  // Импортируем готовый тип

export interface ProjectAction {
  label: string;
  face: 'solid' | 'light';
  to?: string;
  href?: string;
}

export interface ProjectMeta {
  title: string;
  value: string;
  link?: {
    href: string;
    phrase: string;
  };
}

export type ProjectScreen = ScreenProps & {

}

export interface ProjectData {
  id: string;
  companyName: string;
  projectName: string;
  description: string[];
  logo: string;
  innerLink?: ProjectAction,
  actions: ProjectAction[];
  meta: ProjectMeta[];
  screens: ProjectScreen[];
  projectPageUrl?: RoutePath;  // ← Используем RoutePath

}
