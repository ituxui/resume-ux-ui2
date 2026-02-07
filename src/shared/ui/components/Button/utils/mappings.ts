import type { IconSize } from '@shared/ui/atoms/Icon/Icon';
import type { TextRole } from '@shared/ui/components/Text/Text';
import type { ButtonSize, ButtonAccent, ButtonFace } from '../Button';

export const autoIconSizeMap: Record<ButtonSize, IconSize> = {
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

const textRoleMap = {
  normal: {
    md: 'button-md',
    lg: 'button-lg',
    xl: 'button-xl',
  },
  invert: {
    md: 'button-md-on_invert',
    lg: 'button-lg-on_invert',
    xl: 'button-xl-on_invert',
  },
} as const;

export const getTextRole = (size: ButtonSize, isInvert: boolean): TextRole => {
  const variant = isInvert ? 'invert' : 'normal';
  return textRoleMap[variant][size];
};

export const isInvertText = (accent: ButtonAccent, face: ButtonFace): boolean => {
  return face === 'solid' && (accent === 'primary' || accent === 'high');
};
