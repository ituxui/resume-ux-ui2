import React from 'react';
import styles from './RobotoFlexAnimation.module.scss';
import cn from 'classnames';

export const RobotoFlexAnimation: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={cn(styles.line, styles.animVariable)}>
        Вариативный
      </h2>

      <h2 className={cn(styles.line, styles.animRoboto)}>
        Roboto
      </h2>

      <h2 className={cn(styles.line, styles.animFlex)}>
        Flex
      </h2>
    </div>
  );
};
