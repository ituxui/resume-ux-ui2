
import type { IconName } from '@shared/ui/atoms';
import type { ButtonType } from './getButtonType';

export const getAutoIconName = (type: ButtonType): IconName => {
  const iconMap: Record<ButtonType, IconName> = {
    download: 'download',
    internal: 'arrow-right',
    modal: 'expand',
    external: 'arrow-top-right',
    anchor: 'arrow-down-right',
    email: 'arrow-top-right', // Как внешняя ссылка
  };

  return iconMap[type] || 'arrow-right';
};
