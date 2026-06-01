import type { ReactNode } from 'react';
import styles from './HeadingMainPage.module.scss';
import { Heading, Text } from '@shared/ui';
import classNames from 'classnames';

type HeadingMainPageProps = {
  heading: ReactNode;
  description: ReactNode;
  className?: string;
};

export const HeadingMainPage = ({ heading, description, className }: HeadingMainPageProps) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.descriptionRow}>
        <span className={styles.marker} aria-hidden="true" />
        <Text role="body" className={styles.description} colorScheme="muted">
          {description}
        </Text>
      </div>

      <Heading role="section" className={styles.heading}>
        {heading}
      </Heading>
    </div>
  );
};
