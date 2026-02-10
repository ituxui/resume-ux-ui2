import type { ReactNode } from 'react';
import { Heading, Text } from '@components';
import styles from './Meta.module.scss';
import classNames from 'classnames';

interface MetaProps {
  /** Заголовок мета-информации */
  title: string;
  /** Содержимое мета-информации */
  children: ReactNode;
  /** Дополнительные классы */
  className?: string;
}

export const Meta = ({ title, children, className }: MetaProps) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Heading role="meta" className={styles.title}>
        {title}
      </Heading>
      <Text role="meta" className={styles.info}>
        {children}
      </Text>
    </div>
  );
};
