import { useLocation } from 'react-router';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbItem } from './BreadcrumbItem/BreadcrumbItem';
import { routeMap, landingRouteMap } from '@shared/routes';

interface IBreadcrumb {
  to: string;
  label: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbs: IBreadcrumb[] = [
    {
      to: landingRouteMap['landing'].path,
      label: landingRouteMap['landing'].breadcrumbTitle,
    },
  ];

  if (currentPath.startsWith('/case/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-projects'].path,
      label: landingRouteMap['anchor-projects'].breadcrumbTitle,
    });
  }

  if (currentPath.startsWith('/article/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-articles'].path,
      label: landingRouteMap['anchor-articles'].breadcrumbTitle,
    });
  }

  if (currentPath.startsWith('/aboutme/')) {
    breadcrumbs.push({
      to: landingRouteMap['anchor-about-me'].path,
      label: landingRouteMap['anchor-about-me'].breadcrumbTitle,
    });
  }

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

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.wrapper}>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li className={styles.li} key={crumb.to + index}>
              <BreadcrumbItem
                to={crumb.to}
                label={crumb.label}
                isLast={isLast}
                hasSeparator={!isLast} // Передаем флаг внутрь
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
