import cn from 'classnames';
import styles from './ProductTitle.module.scss';
import { Heading, Icon } from '@shared/ui';

interface ProductTitleProps {
  /** Название компании */
  companyName: string;
  /** Название проекта */
  projectName: string;
  /** Дополнительный класс */
  className?: string;
}

export const ProductTitle = ({
  companyName,
  projectName,
  className,
}: ProductTitleProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <Heading role="article">{companyName}</Heading>

      <Icon
        name="asterisk"
        size="xxl"
        className={styles.separator}
      />

      <Heading role="article">{projectName}</Heading>
    </div>
  );
};
