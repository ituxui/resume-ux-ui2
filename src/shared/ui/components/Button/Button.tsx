import { type ReactNode, type MouseEvent, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router';
import cn from 'classnames';
import styles from './Button.module.scss';
import { Icon, type IconName, type IconSize } from '@shared/ui/atoms/Icon/Icon';
import { Text } from '@shared/ui/components/Text/Text';
import {
  getButtonType,
  getAutoIconName,
  downloadFile,
  scrollToAnchor,
  autoIconSizeMap,
  getTextRole,
  isInvertText,
} from './utils';

export type ButtonAccent = 'high' | 'primary';
export type ButtonContent = 'text-icon' | 'text' | 'icon' | 'icon-text';
export type ButtonFace = 'solid' | 'light' | 'outline';
export type ButtonSize = 'md' | 'lg' | 'xl';
export type ButtonWidth = 'auto' | 'full' | 'full-between';

export interface ButtonProps {
  children?: ReactNode;
  accent?: ButtonAccent;
  content?: ButtonContent;
  face?: ButtonFace;
  size?: ButtonSize;
  width?: ButtonWidth;
  isActive?: boolean;
  iconName?: IconName;
  iconSize?: IconSize;
  href?: string;
  to?: string;
  download?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  anchorId?: string;
  target?: string;
  rel?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // Полиморфный проп (если нужно отрендерить как div явно)
  as?: 'button' | 'a' | 'div';
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, ButtonProps>(({
  children,
  accent = 'primary',
  content = 'text-icon',
  face = 'solid',
  size = 'md',
  width = 'auto',
  isActive = false,
  iconName,
  iconSize,
  href,
  to,
  download,
  onClick,
  anchorId,
  target,
  rel,
  className,
  disabled = false,
  type = 'button',
  as,
  ...props
}, ref) => {
  const buttonType = getButtonType({ href, to, download, onClick, anchorId });

  // 1. ОПРЕДЕЛЯЕМ ИНТЕРАКТИВНОСТЬ
  // Если нет действий и это не submit/reset, то кнопка декоративная
  const isInteractive = Boolean(
    href ||
    to ||
    download ||
    onClick ||
    anchorId ||
    type === 'submit' ||
    type === 'reset'
  );

  // Если кнопка не интерактивна, убираем её из Tab-порядка
  const tabIndex = isInteractive && !disabled ? undefined : -1;

  const finalIconName = iconName || getAutoIconName(buttonType);
  const finalIconSize = iconSize || autoIconSizeMap[size];
  const invert = isInvertText(accent, face);
  const textRole = getTextRole(size, invert);

  const classes = cn(
    styles.button,
    styles[`accent_${accent}`],
    styles[`face_${face}`],
    styles[`size_${size}`],
    styles[`content_${content}`],
    styles[`width_${width}`],
    {
      [styles.active]: isActive,
      [styles.disabled]: disabled,
      [styles.notInteractive]: !isInteractive, // Добавляем класс стиля
    },
    className
  );

  const renderContent = () => {
    const textNode = children && (
      <Text role={textRole} className={styles.text}>{children}</Text>
    );
    const iconNode = <Icon name={finalIconName} size={finalIconSize} className={styles.icon} />;

    switch (content) {
      case 'icon': return iconNode;
      case 'text': return textNode;
      case 'icon-text': return <>{iconNode}{textNode}</>;
      case 'text-icon':
      default: return <>{textNode}{iconNode}</>;
    }
  };

  const handleClick = (e: MouseEvent, callback?: () => void) => {
    if (!isInteractive || disabled) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    callback?.();
    onClick?.(e);
  };

  // Если передан проп as="div", рендерим div (для вложенности в ссылки)
  if (as === 'div') {
    return (
      <div className={classes} {...props}>
        {renderContent()}
      </div>
    );
  }

  // 1. Download
  if (buttonType === 'download' && href) {
    return (
      <button
        ref={ref as any}
        type="button"
        className={classes}
        disabled={disabled}
        onClick={(e) => handleClick(e, () => downloadFile(href, typeof download === 'string' ? download : undefined))}
        tabIndex={tabIndex}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }

  // 2. Internal
  if (buttonType === 'internal' && to) {
    return (
      <RouterLink
        ref={ref as any}
        to={to}
        className={classes}
        onClick={(e) => handleClick(e)}
        tabIndex={tabIndex}
        {...props}
      >
        {renderContent()}
      </RouterLink>
    );
  }

  // 3. Anchor
  if (buttonType === 'anchor') {
    const targetId = anchorId || href || '';
    return (
      <a
        ref={ref as any}
        href={targetId}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          handleClick(e, () => scrollToAnchor(targetId));
        }}
        tabIndex={tabIndex}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // 4. External / Email
  if ((buttonType === 'external' || buttonType === 'email') && href) {
    return (
      <a
        ref={ref as any}
        href={href}
        target={target || (buttonType === 'external' ? '_blank' : undefined)}
        rel={rel || (buttonType === 'external' ? 'noopener noreferrer' : undefined)}
        className={classes}
        onClick={(e) => handleClick(e)}
        tabIndex={tabIndex}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // 6. Button (Default / Modal)
  return (
    <button
      ref={ref as any}
      type={type}
      className={classes}
      onClick={(e) => handleClick(e)}
      disabled={disabled || !isInteractive}
      tabIndex={tabIndex}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';
