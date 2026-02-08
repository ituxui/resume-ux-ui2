import {
  type FC,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import cn from 'classnames';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { List } from '../list/List';
import { ListItem } from '../list/ListItem';
import type { PersonsProps } from './Persons.types';
import styles from './Persons.module.scss';

// Функция плавности (Ease In Out Cubic) — для мягкого старта и финиша
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const Persons: FC<PersonsProps> = ({
  persons,
  className,
  nextLabel = 'Следующий портрет',
  restartLabel = 'Начать заново',
  prevLabel = 'Предыдущий портрет',
}) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const total = persons.length;
  const isLast = current === total - 1;
  const remaining = total - current - 1;

  const updateHeight = useCallback(() => {
    const slide = slideRefs.current[current];
    if (slide) {
      setViewportHeight(slide.offsetHeight);
    }
  }, [current]);

  useEffect(() => {
    updateHeight();
  }, [current, updateHeight]);

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  // Дополнительная проверка высоты после анимации
  useEffect(() => {
    const timer = setTimeout(updateHeight, 350);
    return () => clearTimeout(timer);
  }, [current, updateHeight]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0 });
    }
  }, [current]);

  // ═══════════════════════════════════════════════════════════════════════
  // Кастомный плавный скролл
  // ═══════════════════════════════════════════════════════════════════════

  const scrollToTop = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const offset = 20; // Отступ сверху
    // Вычисляем целевую позицию скролла
    const targetY = window.scrollY + rect.top - offset;
    const startY = window.scrollY;
    const distance = targetY - startY;

    // Если скроллить почти некуда (например, мы уже наверху), не запускаем анимацию
    if (Math.abs(distance) < 10) return;

    const duration = 600; // Длительность скролла в мс (можно увеличить для большей плавности)
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Применяем функцию плавности
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + (distance * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // Навигация
  // ═══════════════════════════════════════════════════════════════════════

  const navigate = useCallback(
    (nextIndex: number, dir: 'next' | 'prev') => {
      if (isAnimating) return;

      setDirection(dir);
      setIsAnimating(true);

      // Запускаем скролл
      scrollToTop();

      // Задержка смены контента
      setTimeout(() => {
        setCurrent(nextIndex);

        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    },
    [isAnimating, scrollToTop]
  );

  const goNext = () => {
    const next = isLast ? 0 : current + 1;
    navigate(next, 'next');
  };

  const goPrev = () => {
    const prev = current === 0 ? total - 1 : current - 1;
    navigate(prev, 'prev');
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    if (index !== current) {
      return { display: 'none' };
    }

    if (isAnimating) {
      const translateX = direction === 'next' ? '-120%' : '120%';
      return {
        transform: `translateX(${translateX})`,
        opacity: 0,
        transition: 'transform 0.35s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.25s ease',
      };
    }

    return {
      transform: 'translateX(0)',
      opacity: 1,
      transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease 0.05s',
    };
  };

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper, className)}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        style={{ height: viewportHeight > 0 ? `${viewportHeight}px` : 'auto' }}
      >
        {persons.map((person, index) => (
          <div
            key={index}
            ref={(el) => { slideRefs.current[index] = el; }}
            className={styles.slideWrapper}
            style={getSlideStyle(index)}
          >
            <div className={styles.slide}>
              <div className={styles.header}>
                <Heading role="article">{person.name}</Heading>
                <Text role="caption" colorScheme="muted">
                  {person.subtitle}
                </Text>
              </div>

              {person.sections.map((section, sIdx) => (
                <div key={sIdx} className={styles.section}>
                  <Heading role="feature">{section.title}</Heading>
                  <List ordered={section.ordered} role="person">
                    {section.items.map((item, iIdx) => (
                      <ListItem key={iIdx}>{item}</ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nav}>
        <Button
          face="outline"
          size="lg"
          content="icon"
          iconName="arrow-left"
          onClick={goPrev}
        />

        <Text role="caption" className={styles.counter}>
          {current + 1} из {total}
        </Text>

        <Button
          face={isLast ? 'light' : 'solid'}
          size="lg"
          content="text"
          width="full"
          onClick={goNext}
          className={styles.navButton}
        >
          {isLast
            ? restartLabel
            : `${nextLabel} (ещё ${remaining})`
          }
        </Button>
      </div>
    </div>
  );
};
