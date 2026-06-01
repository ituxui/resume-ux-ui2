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
  href, // <-- Достаем href
}: BentoItemProps) => {
  const navigate = useNavigate();

  // Карточка кликабельна, если передан to или href
  const isClickable = Boolean(to || href);

  const handleNavigate = () => {
    if (href) {
      // Открываем внешнюю ссылку в новой вкладке безопасно
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (to) {
      // Иначе используем внутренний роутинг
      navigate(to);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickable) return;

    // Если кликнули по ссылке или кнопке внутри карточки, не переходим по карточке
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    handleNavigate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;

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
      tabIndex={isClickable ? 0 : -1} // Делаем фокусируемым, если есть to или href
      role={isClickable ? 'link' : undefined}
      className={classNames(
        styles.wrapper,
        styles[`margin_mode--${marginMode}`],
        (isClickable || href) && styles.clickable, // Применяем ховер-эффекты
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
