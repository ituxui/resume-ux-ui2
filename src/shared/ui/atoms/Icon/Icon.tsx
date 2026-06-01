import React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

// Импорт всех иконок
import ArrowDown from './icons/arrow-down.svg?react';
import ArrowDownRight from './icons/arrow-down-right.svg?react';
import ArrowLeft from './icons/arrow-left.svg?react';
import ArrowRight from './icons/arrow-right.svg?react';
import ArrowTopRight from './icons/arrow-top-right.svg?react';
import Asterisk from './icons/asterisk.svg?react';
import Check from './icons/check.svg?react';
import ChevronDown from './icons/chevron-down.svg?react';
import ChevronLeft from './icons/chevron-left.svg?react';
import ChevronRight from './icons/chevron-right.svg?react';
import ChevronUp from './icons/chevron-up.svg?react';
import Circle from './icons/circle.svg?react';
import CircleCheck from './icons/circle-check.svg?react';
import CircleCross from './icons/circle-cross.svg?react';
import Copy from './icons/copy.svg?react';
import Download from './icons/download.svg?react';
import Download1 from './icons/download-1.svg?react';
import Expand from './icons/expand.svg?react';
import External from './icons/external-link.svg?react';
import Home from './icons/home.svg?react';
import Monitor from './icons/monitor.svg?react';
import Menu from './icons/menu.svg?react';
import Plus from './icons/plus.svg?react';
import Smartphone from './icons/smartphone.svg?react';
import Tablet from './icons/tablet.svg?react';
import X from './icons/x.svg?react';

const icons = {
  'arrow-down-right': ArrowDownRight,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'asterisk': Asterisk,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle-check': CircleCheck,
  'circle-cross': CircleCross,
  'circle': Circle,
  'copy': Copy,
  'download-1': Download1,
  'download': Download,
  'expand': Expand,
  'external-link': External,
  'home': Home,
  'monitor': Monitor,
  'menu': Menu,
  'plus': Plus,
  'smartphone': Smartphone,
  'tablet': Tablet,
  'x': X,
} as const;

export type IconName = keyof typeof icons;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  style,
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span
      className={cn(styles.icon, styles[size], className)}
      style={style}
    >
      <IconComponent />
    </span>
  );
};
