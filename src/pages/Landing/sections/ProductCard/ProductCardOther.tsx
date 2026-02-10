import { type ReactNode } from 'react';
import styles from './ProductCard.module.scss';
import { Heading, Text } from '@shared/ui';
import classNames from 'classnames';

interface ProductCardOtherProps {
  /** Заголовок */
  heading: string;
  /** Описание проекта */
  description: ReactNode;
  /** Группа контейнеров summary (мета-информация) */
  summaryItems?: ReactNode[];
  /** Галерея */
}

export const ProductCardOther = ({
  heading,
  description,
  // summaryItems = [],
}: ProductCardOtherProps) => {
  return (
    <div className={classNames(styles.wrapper, styles.others, styles[`mode-${'landing'}`])}>
      <div className={styles.container}>


        <div className={styles.heading}>
          <Heading role="article">{heading}</Heading>
        </div>

        <Text role="description" className={styles.description} >
          {description}
        </Text>
        {/* {summaryItems.length > 0 && (
          <div className={styles.meta}>
            {summaryItems.map((item, index) => (
              <Fragment key={index}>
                {item}
              </Fragment>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};
