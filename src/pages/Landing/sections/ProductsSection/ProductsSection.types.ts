import type { ScreenMode, ScreenScroll, ScreenSize } from "@shared/ui/sections";
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

export interface ProjectScreen {
  src: string;
  alt: string;
  size: ScreenSize;
  mode?: ScreenMode;
  scroll?: ScreenScroll;
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
