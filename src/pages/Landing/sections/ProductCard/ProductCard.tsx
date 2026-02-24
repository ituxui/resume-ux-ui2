import { Fragment, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.scss';
import type { RoutePath } from '@shared/routes';
import cn from 'classnames';
import { Gallery } from '@shared/ui/wrappers';
import { ProductTitle } from '@shared/ui/wrappers';
import { Image } from '@shared/ui/components';

interface ProductCardProps {
  companyName: string;
  projectName: string;
  description: ReactNode;
  actions?: ReactNode[];
  summaryItems?: ReactNode[];
  gallery?: ReactNode;
  projectPageUrl?: RoutePath;
  mode: 'page' | 'landing';
  logo?: string;
}

export const ProductCard = ({
  actions = [],
  companyName,
  description,
  gallery,
  logo,
  mode,
  projectName,
  projectPageUrl,
  summaryItems = [],
}: ProductCardProps) => {
  const navigate = useNavigate();
  const isClickable = Boolean(projectPageUrl);

  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // 1. Игнорируем клики по интерактивным элементам (кнопки, ссылки)
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    // 2. Переходим на страницу
    if (projectPageUrl) {
      navigate(projectPageUrl);
    }
  };

  return (
    <div className={cn(styles.wrapper, styles[`mode-${mode}`])}>
      <div
        className={cn(styles.container, {
          [styles.clickable]: isClickable, // 🔥 Активирует cursor: pointer из SCSS
        })}
        onClick={isClickable ? handleCardClick : undefined}
        role={isClickable ? 'link' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyUp={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleCardClick(e);
          }
        }}
      >
        {mode === 'page' && logo && (
          <div className={styles.logo}>
            <Image src={logo} alt={'Brand logo'} zoomable={false} />
          </div>
        )}

        <ProductTitle
          companyName={companyName}
          projectName={projectName}
          className={styles.heading}
          mode={mode}
        />

        <div className={styles.description}>{description}</div>

        <div className={styles.buttons}>
          {actions.length > 0 && (
            <>
              {actions.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
            </>
          )}
        </div>

        {summaryItems.length > 0 && (
          <div className={styles.meta}>
            {summaryItems.map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
          </div>
        )}

        {gallery && (
          <div
            className={styles.gallery}
            // 🔥 Блокируем клик на галерее
            onClick={(e) => {
              if (isClickable) e.stopPropagation();
            }}
            // 🔥 Возвращаем дефолтный курсор для галереи
            style={{ cursor: isClickable ? 'default' : undefined }}
          >
            <Gallery>{gallery}</Gallery>
          </div>
        )}
      </div>
    </div>
  );
};
