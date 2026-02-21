import { useNavigate } from 'react-router';
import classNames from 'classnames';
import styles from './BentoItem.module.scss';
import type { BentoItemProps } from './BentoItem.types';
import { Heading } from '@components';

export const BentoItem = ({
  heading,
  headingIcon,
  children,
  marginMode = 'large',
  className,
  to,
}: BentoItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (to) navigate(to);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!to) return;
    // Если кликнули по ссылке или кнопке внутри карточки, не переходим по карточке
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    handleNavigate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!to) return;
    // Поддержка навигации с клавиатуры (Enter или Пробел)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={to ? 0 : -1} // Делаем фокусируемым только если есть ссылка
      role={to ? 'link' : undefined}
      className={classNames(
        styles.wrapper,
        styles[`margin_mode--${marginMode}`],
        to && styles.clickable,
        className
      )}
    >
      {heading && (
        <div className={styles.header}>
          <Heading role="bento" className={styles.heading}>
            {heading}
          </Heading>
          {headingIcon && (
            <span className={styles.headingIcon}>{headingIcon}</span>
          )}
        </div>
      )}
      <div className={classNames(styles.children, 'children')}>{children}</div>
    </div>
  );
};
