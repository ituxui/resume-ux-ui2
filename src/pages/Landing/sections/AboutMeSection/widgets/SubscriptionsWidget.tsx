import { type FC, useRef, useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import styles from './SubscriptionsWidget.module.scss';
import { Heading, Tab, Text } from '@components';

interface SubscriptionItem {
  heading: string;
  url: string;
  imgUrl: string;
  description: string;
}

interface SubscriptionCategory {
  heading: string;
  shortHeading: string;
  description: string;
  items: SubscriptionItem[];
}

interface SubscriptionsWidgetProps {
  data: SubscriptionCategory[];
  className?: string;
}

export const SubscriptionsWidget: FC<SubscriptionsWidgetProps> = ({
  data,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  // Drag scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const setSectionRef = useCallback((el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  }, []);

  // Drag scroll handlers для таб-бара
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - tabs.offsetLeft;
    scrollLeftRef.current = tabs.scrollLeft;
    tabs.style.cursor = 'grabbing';
    tabs.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const tabs = tabsRef.current;
    if (!tabs) return;

    e.preventDefault();
    const x = e.pageX - tabs.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    tabs.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    isDraggingRef.current = false;
    tabs.style.cursor = 'grab';
    tabs.style.userSelect = '';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    isDraggingRef.current = false;
    tabs.style.cursor = 'grab';
    tabs.style.userSelect = '';
  }, []);

  // Touch handlers для таб-бара
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - tabs.offsetLeft;
    scrollLeftRef.current = tabs.scrollLeft;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const tabs = tabsRef.current;
    if (!tabs) return;

    const x = e.touches[0].pageX - tabs.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    tabs.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Скролл до секции при клике на таб
  const handleTabClick = useCallback((index: number) => {
    if (Math.abs(scrollLeftRef.current - (tabsRef.current?.scrollLeft || 0)) > 5) {
      return;
    }

    const section = sectionRefs.current[index];
    const container = containerRef.current;

    if (!section || !container) return;

    isScrollingRef.current = true;
    setActiveIndex(index);

    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const tabsHeight = 36;

    const scrollTop = container.scrollTop + sectionRect.top - containerRect.top - tabsHeight;

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  }, []);

  // Скролл таб-бара к активному табу (центрирование)
  const scrollTabIntoView = useCallback((index: number) => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const tab = tabs.children[index] as HTMLElement;
    if (!tab) return;

    const tabsCount = tabs.children.length;
    const isFirst = index === 0;
    const isLast = index === tabsCount - 1;

    if (isFirst) {
      tabs.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else if (isLast) {
      tabs.scrollTo({
        left: tabs.scrollWidth - tabs.clientWidth,
        behavior: 'smooth',
      });
    } else {
      const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
      const tabsVisibleWidth = tabs.clientWidth;
      const scrollLeft = tabCenter - tabsVisibleWidth / 2;

      tabs.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, []);

  // Отслеживание скролла для подсветки активного таба
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const containerRect = container.getBoundingClientRect();
      const tabsHeight = 36;
      const checkPoint = containerRect.top + tabsHeight + 20;

      // Проверяем, прокручено ли до конца
      const isScrolledToEnd =
        container.scrollHeight - container.scrollTop - container.clientHeight < 5;

      let newActiveIndex = 0;

      if (isScrolledToEnd) {
        // Если прокручено до конца — последний таб активен
        newActiveIndex = data.length - 1;
      } else {
        // Иначе определяем по позиции секций
        sectionRefs.current.forEach((section, index) => {
          if (!section) return;

          const sectionRect = section.getBoundingClientRect();

          if (sectionRect.top <= checkPoint) {
            newActiveIndex = index;
          }
        });
      }

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
        scrollTabIntoView(newActiveIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, scrollTabIntoView, data.length]);


  return (
    <div ref={containerRef} className={cn(styles.widget, className)}>
      {/* Sticky табы с drag scroll */}
      <div
        ref={tabsRef}
        className={styles.tabs}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {data.map((category, index) => (
          <Tab
            key={category.shortHeading}
            isActive={activeIndex === index}
            onClick={() => handleTabClick(index)}
            size="sm"
          >
            {category.shortHeading}
          </Tab>
        ))}
      </div>

      {/* Контент */}
      <div className={styles.content}>
        {data.map((category, index) => (
          <section
            key={category.shortHeading}
            ref={(el) => setSectionRef(el, index)}
            className={styles.section}
          >
            <Heading role='group' className={styles.sectionHeading}>{category.heading}</Heading>

            <ul className={styles.list}>
              {category.items.map((item) => (
                <li key={item.url} className={styles.item}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.itemLink}
                  >
                    <img
                      src={item.imgUrl}
                      alt={item.heading}
                      className={styles.itemImage}
                    />
                    <Heading role='item' className={styles.itemText}>{item.heading}</Heading>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};
