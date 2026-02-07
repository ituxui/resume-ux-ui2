import classNames from 'classnames';
import styles from './BentoItem.module.scss';
import type { BentoItemProps } from './BentoItem.types';
import { Heading } from '@components';



export const BentoItem = (
  {
    heading,
    headingIcon,
    children,
    marginMode = 'large',
    className,
  }: BentoItemProps
) => {
  return <div className={classNames(
    styles.wrapper,
    styles[`margin_mode--${marginMode}`],
    className,
  )}>
    {
      heading && <div className={styles.header}>
        <Heading role="bento" className={styles.heading}>{heading}</Heading>
        {headingIcon && <span className={styles.headingIcon}>{headingIcon}</span>}
      </div>
    }
    {
      <div className={classNames(styles.children, 'children')}>
        {children}
      </div>
    }
  </div>;
}
