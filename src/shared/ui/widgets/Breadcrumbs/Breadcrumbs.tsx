import { useLocation } from 'react-router';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbItem } from './BreadcrumbItem/BreadcrumbItem';
import { routeMap, landingRouteMap } from '@shared/routes';

// Интерфейс для одной крошки
interface IBreadcrumb {
  to: string;
  label: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. Начальная точка — всегда "Главная"
  const breadcrumbs: IBreadcrumb[] = [
    {
      to: landingRouteMap['landing'].path,
      label: landingRouteMap['landing'].breadcrumbTitle,
    },
  ];

  // 2. Логика промежуточных звеньев (Parent Sections)

  if (currentPath.startsWith('/case/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-projects'].path,
      label: landingRouteMap['anchor-projects'].breadcrumbTitle, // "Проекты"
    });
  }

  if (currentPath.startsWith('/article/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-articles'].path,
      label: landingRouteMap['anchor-articles'].breadcrumbTitle, // "Статьи"
    });
  }

  if (currentPath.startsWith('/aboutme/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-about-me'].path,
      label: landingRouteMap['anchor-about-me'].breadcrumbTitle, // "Обо мне"
    });
  }

  // 3. Текущая страница (Leaf)
  // Ищем совпадение текущего пути в карте маршрутов, если это не главная
  if (currentPath !== '/') {
    const currentPageEntry = Object.values(routeMap).find(
      (entry) => entry.path === currentPath
    );

    if (currentPageEntry) {
      breadcrumbs.push({
        to: currentPageEntry.path,
        label: currentPageEntry.breadcrumbTitle,
      });
    }
  }

  // УБРАЛ ПРОВЕРКУ length <= 1, теперь рендерится всегда

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.wrapper}>
        {breadcrumbs.map((crumb, index) => {
          // Последним элементом считается тот, у которого index совпадает с длиной массива
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={crumb.to + index}>
              <li className={styles.li}>
                <BreadcrumbItem
                  to={crumb.to}
                  label={crumb.label}
                  isLast={isLast}
                />
              </li>

              {/* Разделитель рисуем, если элемент НЕ последний */}
              {!isLast && (
                <li className={styles.separator} aria-hidden="true">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
