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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Если путь не задан, ничего не делаем
    if (!to) return;

    // Проверяем, не кликнули ли мы по интерактивному элементу внутри (ссылка, кнопка)
    // Если да — даем сработать внутреннему элементу, а навигацию карточки игнорируем
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }

    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        styles.wrapper,
        styles[`margin_mode--${marginMode}`],
        // Добавляем класс для курсора pointer, если есть ссылка
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
