import {
  type FC,
  type ReactNode,
  useRef,
  useEffect,
  useState,
  useCallback,
  Children,
} from 'react';
import cn from 'classnames';
import styles from './Gallery.module.scss';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface GalleryProps {
  children: ReactNode;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const MOBILE_BREAKPOINT = 768;
const THROTTLE_MS = 100; // Уменьшил таймер для большей отзывчивости

/** data-screen-size → grid-column span */
const SPAN_MAP: Record<string, number> = {
  '1/3': 1,
  '2/3': 2,
  '3/3': 3,
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Gallery: FC<GalleryProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth > MOBILE_BREAKPOINT : true,
  );

  // ─── Throttled resize listener ─────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timer) return;
      timer = setTimeout(() => {
        setIsDesktop(window.innerWidth > MOBILE_BREAKPOINT);
        timer = null;
      }, THROTTLE_MS);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // ─── Logic: Calculate Layout Mode & Spans ──────────────────────
  const applyLayout = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Если мобилка — чистим стили десктопа и выходим
    if (!isDesktop) {
      el.classList.remove(styles.vertical);
      Array.from(el.children).forEach((child) => {
        (child as HTMLElement).style.gridColumn = '';
      });
      return;
    }

    const kids = Array.from(el.children) as HTMLElement[];
    const count = kids.length;

    // 1. Проверяем сценарий "Все элементы 3/3"
    // Если элементов 2 или 3, и ВСЕ они имеют размер 3/3 -> включаем Vertical Flex
    const allAreFullWidth = kids.every(
      (child) => child.getAttribute('data-screen-size') === '3/3'
    );
    const isVerticalMode = (count === 2 || count === 3) && allAreFullWidth;

    if (isVerticalMode) {
      el.classList.add(styles.vertical);
      // Очищаем grid-column, так как теперь работаем во flex
      kids.forEach((child) => {
        child.style.gridColumn = '';
      });
    } else {
      el.classList.remove(styles.vertical);

      // 2. Стандартный режим Grid: расставляем span
      kids.forEach((child) => {
        const size = child.getAttribute('data-screen-size');
        let span: number;

        if (count === 1) {
          // Один ребёнок — всегда на всю ширину
          span = 3;
        } else {
          span = (size && SPAN_MAP[size]) || 1;
        }

        child.style.gridColumn = `span ${span}`;
      });
    }
  }, [isDesktop]);

  // ─── Effect: Apply layout initially & on updates ───────────────
  useEffect(() => {
    applyLayout();
  }, [applyLayout, children]);

  // ─── MutationObserver: Re-apply if children props change ───────
  useEffect(() => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;

    const observer = new MutationObserver(applyLayout);
    observer.observe(el, {
      childList: true,
      attributes: true,
      attributeFilter: ['data-screen-size']
    });

    return () => observer.disconnect();
  }, [isDesktop, applyLayout]);

  const childCount = Children.count(children);

  return (
    <div
      ref={ref}
      className={cn(
        styles.gallery,
        isDesktop ? styles.desktop : styles.mobile,
        className,
      )}
      data-gallery-children={childCount}
    >
      {children}
    </div>
  );
};
