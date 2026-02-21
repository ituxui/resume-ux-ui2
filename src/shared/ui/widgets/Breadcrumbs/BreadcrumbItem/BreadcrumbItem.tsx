import { Link as RouterLink } from 'react-router';
import cn from 'classnames';
import styles from './BreadcrumbItem.module.scss';
import { Text } from '@shared/ui/components/Text/Text';

interface BreadcrumbItemProps {
  to: string;
  label: string;
  isLast?: boolean;
}

export const BreadcrumbItem = ({ to, label, isLast }: BreadcrumbItemProps) => {
  if (isLast) {
    // Последний элемент: неактивный span
    return (
      <span className={cn(styles.item, styles.last)}>
        <Text role="link-sm" colorScheme="muted">
          {label}
        </Text>
      </span>
    );
  }

  // Ссылка
  return (
    <RouterLink to={to} className={styles.item}>
      <Text role="link-sm" colorScheme="muted">
        {label}
      </Text>
    </RouterLink>
  );
};
