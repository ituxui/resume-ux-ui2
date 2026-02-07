import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyLoadOptions {
  /** Порог загрузки в vh от верха viewport */
  threshold?: number;
  /** Интервал throttle в ms */
  throttleMs?: number;
}

interface UseLazyLoadReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  shouldLoad: boolean;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useLazyLoad = ({
  threshold = 200,
  throttleMs = 100,
}: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastCallRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const checkPosition = useCallback(() => {
    // Если уже должны загружать — не проверяем
    if (shouldLoad) return;

    const now = Date.now();
    if (now - lastCallRef.current < throttleMs) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkPosition);
      return;
    }
    lastCallRef.current = now;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Расстояние от верха viewport до верхнего края элемента (в vh)
    const distanceVh = (rect.top / viewportHeight) * 100;

    // Загружаем если элемент ближе чем threshold vh
    if (distanceVh < threshold) {
      setShouldLoad(true);
    }
  }, [shouldLoad, threshold, throttleMs]);

  useEffect(() => {
    // Если уже загружаем — не слушаем скролл
    if (shouldLoad) return;

    // Начальная проверка
    checkPosition();

    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldLoad, checkPosition]);

  return {
    containerRef,
    shouldLoad,
    isLoaded,
    setIsLoaded,
  };
};
