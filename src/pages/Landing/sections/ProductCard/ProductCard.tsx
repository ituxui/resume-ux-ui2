import { Fragment, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.scss';
import type { RoutePath } from '@shared/routes';  // Импортируем тип
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
  projectPageUrl?: RoutePath;  // ← Используем RoutePath
  mode: 'page' | 'landing';
  logo?: string,
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

  const handleLeftClick = () => {
    if (projectPageUrl) {
      navigate(projectPageUrl);  // ← Теперь это уже путь, не ключ
    }
  };

  const isClickable = Boolean(projectPageUrl);

  return (
    <div className={cn(styles.wrapper, styles[`mode-${mode}`])}>
      <div
        className={cn(styles.container, {
          [styles.clickable]: isClickable,
        })}
        onClick={handleLeftClick}
        role={isClickable ? 'link' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyUp={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleLeftClick();
          }
        }}
      >
        {mode === 'page' && logo && <div className={styles.logo}>
          <Image src={logo} alt={'Brand logo'} zoomable={false} />
        </div>}


        <ProductTitle
          companyName={companyName}
          projectName={projectName}
          className={styles.heading}
          mode={mode}
        />

        <div className={styles.description}>
          {description}
        </div>

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

        {gallery && <Gallery className={styles.gallery}>
          {gallery}
        </Gallery>}
      </div>
    </div>
  );
};
