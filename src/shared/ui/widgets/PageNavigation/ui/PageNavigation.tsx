import { Link } from 'react-router';
import cn from 'classnames';

import { usePageNavigation } from '../model/usePageNavigation';
import styles from './PageNavigation.module.scss';

import { Heading } from '@shared/ui/components/Heading/Heading';
import { Text } from '@shared/ui/components/Text/Text';
import { Button } from '@shared/ui/components/Button/Button';
import { Icon } from '@shared/ui/atoms/Icon/Icon';

export const PageNavigation = () => {
  const { prev, next } = usePageNavigation();

  // Если нет ни предыдущей, ни следующей страницы (например, мы на лендинге или вне карты)
  // Компонент вернет null или пустой div
  if (!prev && !next) return null;

  return (
    <div className={styles.wrapper}>
      {/* ─── PREV BUTTON ─── */}
      {prev ? (
        <Link to={prev.entry.path} className={cn(styles.navLink, styles.prev)}>
          {/* Collapsed State */}
          <div className={styles.collapsedContent}>
            <Icon name="chevron-left" size="lg" />
          </div>

          {/* Expanded State */}
          <div className={styles.expandedContent}>
            <div className={styles.textContent}>
              <div className={styles.headingWrapper}>
                <Text role="subheading" className={styles.subLabel}>
                  {prev.label}
                </Text>
                <Heading role="section" as="h3">
                  {prev.entry.heading}
                </Heading>
              </div>

              <div className={styles.buttonWrapper}>
                <Button
                  face="solid"
                  size="lg"
                  content="icon-text" // Иконка слева для кнопки "Назад"
                  iconName="arrow-left"
                  className={styles.fakeButton}
                >
                  {prev.buttonText}
                </Button>
              </div>
            </div>

            <div className={styles.imageWrapper}>
              <img src={prev.entry.img} alt={prev.entry.heading} />
            </div>
          </div>
        </Link>
      ) : (
        <div /> // Spacer if no prev
      )}

      {/* ─── NEXT BUTTON ─── */}
      {next ? (
        <Link to={next.entry.path} className={cn(styles.navLink, styles.next)}>
          {/* Collapsed State */}
          <div className={styles.collapsedContent}>
            <Icon name="chevron-right" size="lg" />
          </div>

          {/* Expanded State */}
          <div className={styles.expandedContent}>
            <div className={styles.imageWrapper}>
              <img src={next.entry.img} alt={next.entry.heading} />
            </div>

            <div className={styles.textContent}>
              <div className={styles.headingWrapper}>
                <Text role="subheading" className={styles.subLabel}>
                  {next.label}
                </Text>
                <Heading role="section" as="h3">
                  {next.entry.heading}
                </Heading>
              </div>

              <div className={styles.buttonWrapper}>
                <Button
                  face="solid"
                  size="lg"
                  content="text-icon" // Иконка справа для кнопки "Читать"
                  iconName="arrow-right"
                  className={styles.fakeButton}
                >
                  {next.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div /> // Spacer if no next
      )}
    </div>
  );
};
