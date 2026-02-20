import { useState } from 'react';
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

  // Состояние: наведен ли курсор на левую часть (Prev)
  // По умолчанию (false) -> раскрыта правая часть (Next)
  const [isPrevHovered, setIsPrevHovered] = useState(false);

  // Если маршрутов нет или мы не на внутренней странице
  if (!prev || !next) return null;

  // Хендлеры
  const handlePrevEnter = () => setIsPrevHovered(true);
  const handlePrevLeave = () => setIsPrevHovered(false); // Убираем мышь -> возвращаемся к Next

  const handleFocusPrev = () => setIsPrevHovered(true);
  const handleFocusNext = () => setIsPrevHovered(false);

  // Логика классов:
  // Prev раскрыт, если на него навели.
  const isPrevExpanded = isPrevHovered;

  // Next раскрыт, если Prev НЕ наведен (дефолтное состояние).
  const isNextExpanded = !isPrevHovered;

  return (
    <div className={styles.container}>

      {/* ════ PREVIOUS PAGE ════ */}
      <Link
        to={prev.entry.path}
        className={cn(styles.navLink, styles.prev, {
          [styles.expanded]: isPrevExpanded
        })}
        onMouseEnter={handlePrevEnter}
        onMouseLeave={handlePrevLeave}
        onFocus={handleFocusPrev}
      >
        {/* Сжатый вид */}
        <div className={styles.collapsedContent}>
          <Icon name="chevron-left" size="lg" />
        </div>

        {/* Раскрытый вид */}
        <div className={styles.expandedContent}>
          <div className={styles.textContent}>
            <div className={styles['textContent--top']}>
              <Text role="caption" className={styles.subLabel}>
                {prev.label}
              </Text>
              <Heading role="navigation-widget" as="h4">
                {prev.entry.heading}
              </Heading>
            </div>

            <div className={styles.fakeButton}>
              <Button
                accent="primary"
                face="solid"
                size="md"
                content="icon-text"
                iconName="chevron-left"
              >
                {prev.buttonText}
              </Button>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <img src={prev.entry.img} alt="" />
          </div>
        </div>
      </Link>

      {/* ════ NEXT PAGE ════ */}
      <Link
        to={next.entry.path}
        className={cn(styles.navLink, styles.next, {
          [styles.expanded]: isNextExpanded
        })}
        onFocus={handleFocusNext}
      // При наведении на Next ничего делать не надо,
      // так как уход с Prev (onMouseLeave) уже сделает Next активным.
      >
        {/* Сжатый вид */}
        <div className={styles.collapsedContent}>
          <Icon name="chevron-right" size="lg" />
        </div>

        {/* Раскрытый вид */}
        <div className={styles.expandedContent}>
          <div className={styles.imageWrapper}>
            <img src={next.entry.img} alt="" />
          </div>

          <div className={styles.textContent}>
            <div className={styles['textContent--top']}>
              <Text role="caption" className={styles.subLabel}>
                {next.label}
              </Text>
              <Heading role="navigation-widget" as="h4">
                {next.entry.heading}
              </Heading>
            </div>

            <div className={styles.fakeButton}>
              <Button
                accent="primary"
                face="solid"
                size="md"
                content="text-icon"
                iconName="chevron-right"
              >
                {next.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </Link >
    </div >
  );
};
