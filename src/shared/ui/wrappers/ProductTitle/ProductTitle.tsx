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

  mode?: 'page' | 'landing';
}

export const ProductTitle = ({
  companyName,
  projectName,
  className,
  mode,
}: ProductTitleProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <Heading role={mode === 'page' ? 'page' : 'article'} className={styles.header}>{companyName}</Heading>

      <Icon
        name="asterisk"
        size="xxl"
        className={styles.separator}
      />

      <Heading role={mode === 'page' ? 'page' : 'article'} className={styles.header}>{projectName}</Heading>
    </div>
  );
};
