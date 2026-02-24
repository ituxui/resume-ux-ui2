import { Link as RouterLink } from 'react-router';
import cn from 'classnames';
import styles from './BreadcrumbItem.module.scss';
import { Text } from '@shared/ui/components/Text/Text';

interface BreadcrumbItemProps {
  to: string;
  label: string;
  isLast?: boolean;
  hasSeparator?: boolean; // Добавили проп для слэша
}

export const BreadcrumbItem = ({ to, label, isLast, hasSeparator }: BreadcrumbItemProps) => {

  // Общий контент (Текст + Слэш)
  const content = (
    <>
      <Text role="link-sm" colorScheme="muted" as="span">
        {label}
      </Text>
      {hasSeparator && (
        <span className={styles.separator} aria-hidden="true">
          /
        </span>
      )}
    </>
  );

  if (isLast) {
    // Последний элемент: неактивный span
    return (
      <span className={cn(styles.item, styles.last)}>
        {content}
      </span>
    );
  }

  // Ссылка (слэш теперь внутри кликабельной области)
  return (
    <RouterLink to={to} className={styles.item}>
      {content}
    </RouterLink>
  );
};
