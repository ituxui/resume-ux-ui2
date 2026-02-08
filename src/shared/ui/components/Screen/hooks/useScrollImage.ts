import { useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// НАСТРОЙКИ ПАРАЛЛАКСА (РЕДАКТИРОВАТЬ ЗДЕСЬ)
// ═══════════════════════════════════════════════════════════════════════════

const PARALLAX_CONFIG = {
  // ПЛАВНОСТЬ (Инерция)
  // 0.01 — очень медленно, 0.1 — отзывчиво.
  // При сильном троттлинге (500мс) нужно ставить маленькое значение (0.02–0.05),
  // чтобы скрыть "ступеньки" пересчета.
  SMOOTHNESS: 0.05,

  // ТРОТТЛИНГ (Производительность)
  // Как часто пересчитывать целевую позицию (в мс).
  // Вы просили 500мс.
  THROTTLE_MS: 500,

  // ТОЧКА СТАРТА (Start Trigger) — по ВЕРХНЕМУ краю
  // 0.3 = Анимация начнется, когда ВЕРХ элемента будет на 30% высоты экрана.
  // 1.0 = начнется, как только элемент появится снизу.
  START_VH: 0.3,

  // ТОЧКА КОНЦА (End Trigger) — по НИЖНЕМУ краю
  // 0.3 = Анимация закончится, когда НИЗ элемента будет на 30% высоты экрана.
  // 0.0 = закончится, когда элемент полностью уйдет за верх экрана.
  // -0.1 = закончится чуть позже, чем уйдет за экран.
  END_VH: 0.5,
};

// ═══════════════════════════════════════════════════════════════════════════

interface UseScrollImageOptions {
  enabled: boolean;
}

interface UseScrollImageReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

// Функция линейной интерполяции (Lerp)
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const useScrollImage = ({
  enabled,
}: UseScrollImageOptions): UseScrollImageReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const state = useRef({
    currentY: 0,        // Текущий сдвиг (визуальный)
    targetY: 0,         // Целевой сдвиг (расчетный)
    imageOverflow: 0,   // Запас хода картинки
    isVisible: false,   // Виден ли контейнер
    lastScrollTime: 0,  // Для троттлинга
  });

  const rafId = useRef<number | null>(null);

  // 1. Расчет размеров (Overflow)
  const calcDimensions = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerH = containerRef.current.clientHeight;
    const image = imageRef.current;

    // Реальная высота картинки
    const imageH = image.clientHeight || image.scrollHeight;

    // Насколько картинка больше контейнера
    state.current.imageOverflow = Math.max(0, imageH - containerH);
  }, []);

  // 2. Цикл анимации (Physics Loop)
  const loop = useCallback(() => {
    if (!enabled) return;
    const s = state.current;

    // ЭКОНОМИЯ: Если элемент за экраном — не рисуем
    if (!s.isVisible) {
      rafId.current = null;
      return;
    }

    const diff = s.targetY - s.currentY;

    // Продолжаем анимацию, пока не достигнем цели
    if (Math.abs(diff) > 0.1) {
      s.currentY = lerp(s.currentY, s.targetY, PARALLAX_CONFIG.SMOOTHNESS);

      if (imageRef.current) {
        // GPU-ускорение
        imageRef.current.style.transform = `translate3d(0, -${s.currentY.toFixed(2)}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    } else {
      rafId.current = null;
    }
  }, [enabled]);

  // 3. Обработчик скролла (Математика прогресса)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const s = state.current;

    // ЭКОНОМИЯ: Не считаем математику, если за экраном
    if (!s.isVisible) return;

    // ТРОТТЛИНГ: Не чаще чем раз в THROTTLE_MS
    const now = Date.now();
    if (now - s.lastScrollTime < PARALLAX_CONFIG.THROTTLE_MS) {
      return;
    }
    s.lastScrollTime = now;

    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // ─── ФОРМУЛА ПРОГРЕССА ─────────────────────────────────────────

    // Точка старта (в пикселях от верха экрана), когда rect.top касается этой линии
    const startPoint = vh * PARALLAX_CONFIG.START_VH;

    // Точка конца. Мы хотим, чтобы конец был, когда rect.bottom касается END_VH.
    // Так как rect.bottom = rect.top + height, то:
    // rect.top = (vh * END_VH) - rect.height
    const endPoint = (vh * PARALLAX_CONFIG.END_VH) - rect.height;

    // Полная дистанция, которую элемент проходит в "активной" зоне
    const totalDistance = startPoint - endPoint;

    // Сколько пикселей мы уже прошли от точки старта
    // (startPoint - rect.top) растет, когда мы скроллим вниз (rect.top уменьшается)
    const currentDistance = startPoint - rect.top;

    // Прогресс от 0 до 1
    let progress = currentDistance / totalDistance;

    // Ограничиваем рамками
    progress = Math.max(0, Math.min(1, progress));

    // ───────────────────────────────────────────────────────────────

    // Устанавливаем цель
    s.targetY = progress * s.imageOverflow;

    // Запускаем цикл отрисовки, если он стоял
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  // 4. Инициализация и Observer
  useEffect(() => {
    if (!enabled) return;

    // IntersectionObserver — главный рубильник для экономии ресурсов
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.current.isVisible = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Элемент вошел в кадр
          calcDimensions();
          // Сбрасываем троттлинг для мгновенной реакции
          state.current.lastScrollTime = 0;
          handleScroll();
        } else {
          // Элемент ушел из кадра — убиваем анимацию
          if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
          }
        }
      },
      { rootMargin: '0px' } // Строго по границам экрана
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      calcDimensions();
      state.current.lastScrollTime = 0;
      handleScroll();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Обработка загрузки картинки
    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        calcDimensions();
      } else {
        img.onload = () => {
          calcDimensions();
          handleScroll();
        };
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, calcDimensions, handleScroll]);

  return {
    containerRef,
    imageRef,
  };
};
