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
export type ButtonContent = 'text-icon' | 'text' | 'icon';
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
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
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
  ...props
}, ref) => {
  const buttonType = getButtonType({ href, to, download, onClick, anchorId });

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
    },
    className
  );

  const renderContent = () => (
    <>
      {content !== 'icon' && children && (
        <Text role={textRole} className={styles.text}>
          {children}
        </Text>
      )}
      {content !== 'text' && (
        <Icon
          name={finalIconName}
          size={finalIconSize}
          className={styles.icon}
        />
      )}
    </>
  );

  // Обёртка для обработчиков с stopPropagation
  const handleClick = (e: MouseEvent, callback?: () => void) => {
    e.stopPropagation();
    if (disabled) return;
    callback?.();
    onClick?.(e);
  };

  // 1. Download
  if (buttonType === 'download' && href) {
    const filename = typeof download === 'string' ? download : undefined;
    return (
      <button
        ref={ref as any}
        type="button"
        className={classes}
        disabled={disabled}
        onClick={(e) => handleClick(e, () => downloadFile(href, filename))}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }

  // 2. Internal (React Router)
  if (buttonType === 'internal' && to) {
    return (
      <RouterLink
        ref={ref as any}
        to={to}
        className={classes}
        onClick={(e) => handleClick(e)}
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
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // 4. External
  if (buttonType === 'external') {
    return (
      <a
        ref={ref as any}
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={classes}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // 5. Email (mailto)
  if (buttonType === 'email' && href) {
    return (
      <a
        ref={ref as any}
        href={href}
        className={classes}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // 6. Button (modal / default)
  return (
    <button
      ref={ref as any}
      type={type}
      className={classes}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';
