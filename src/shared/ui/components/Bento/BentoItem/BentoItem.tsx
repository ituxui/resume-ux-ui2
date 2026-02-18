import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './BentoItem.module.scss';
import type { BentoItemProps } from './BentoItem.types';
import { Heading } from '@components';

export const BentoItem = ({
  heading,
  headingIcon,
  children,
  marginMode = 'large',
  className,
  to,
}: BentoItemProps) => {
  // Определяем, какой тег использовать: Link или div
  const Component = to ? Link : 'div';

  // Пропсы для Link (если to существует)
  const linkProps = to ? { to, className: styles.linkReset } : {};

  return (
    <Component
      {...(linkProps as any)}
      className={classNames(
        styles.wrapper,
        styles[`margin_mode--${marginMode}`],
        className
      )}
    >
      {heading && (
        <div className={styles.header}>
          <Heading role="bento" className={styles.heading}>
            {heading}
          </Heading>
          {headingIcon && (
            <span className={styles.headingIcon}>{headingIcon}</span>
          )}
        </div>
      )}
      <div className={classNames(styles.children, 'children')}>{children}</div>
    </Component>
  );
};
