import { Button, Link, Meta, Screen, Text } from "@shared/ui/sections";
import type { ProjectAction, ProjectMeta, ProjectScreen } from "./ProductsSection.types";
import type { ReactNode } from "react";


export type RenderActionsProps = { actions: ProjectAction[], innerLink?: ProjectAction, mode: 'page' | 'landing' }
export const renderActions = ({ actions, innerLink, mode }: RenderActionsProps): ReactNode[] => {
  const allActions = mode === 'landing' && innerLink ? [innerLink, ...actions] : actions;

  return allActions.map((action, index) => (
    <Button
      key={index}
      accent="primary"
      face={action.face}
      to={action.to}
      href={action.href}
    >
      {action.label}
    </Button>
  ));
};


export const renderMeta = (meta: ProjectMeta[]): ReactNode[] => {
  return meta.map((item, index) => (
    <Meta key={index} title={item.title}>
      {item.link ? (
        <Link href={item.link.href} size="sm" phrase={item.link.phrase} />
      ) : (
        item.value
      )}
    </Meta>
  ));
};

export const renderScreens = (screens: ProjectScreen[]): ReactNode => {
  return (
    <>
      {screens.map((screen, index) => (
        <Screen
          key={index}
          src={screen.src}
          alt={screen.alt}
          size={screen.size}
          mode={screen.mode ?? 'default'}
          scroll={screen.scroll}
        />
      ))}
    </>
  );
};

export const renderDescription = (texts: string[]): ReactNode => {
  return (
    <>
      {texts.map((text, index) => (
        <Text key={index} role="description">{text}</Text>
      ))}
    </>
  );
};
