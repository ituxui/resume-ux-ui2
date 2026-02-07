import type { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Tab.module.scss';

type TabSize = 'sm';

interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  size?: TabSize;
  className?: string;
}

export const Tab: FC<TabProps> = ({
  children,
  isActive = false,
  onClick,
  size = 'sm',
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        styles.tab,
        styles[`tab--${size}`],
        { [styles['tab--active']]: isActive },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
