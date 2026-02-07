import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollImageOptions {
  enabled: boolean;
  startThreshold?: number;
  endThreshold?: number;
  throttleMs?: number;
}

interface UseScrollImageReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  scrollProgress: number;
}

export const useScrollImage = ({
  enabled,
  startThreshold = 30,
  endThreshold = 70,
  throttleMs = 16,
}: UseScrollImageOptions): UseScrollImageReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastCallRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (!enabled || !containerRef.current) return;

    const now = Date.now();
    if (now - lastCallRef.current < throttleMs) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => handleScroll());
      return;
    }
    lastCallRef.current = now;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const topPositionVh = (rect.top / viewportHeight) * 100;

    const startPoint = startThreshold;
    const endPoint = -(endThreshold - startThreshold);

    let progress = 0;

    if (topPositionVh <= startPoint) {
      const range = startPoint - endPoint;
      progress = (startPoint - topPositionVh) / range;
    }

    // Ограничиваем 0–1, но не сбрасываем
    progress = Math.max(0, Math.min(1, progress));

    setScrollProgress(progress);
  }, [enabled, startThreshold, endThreshold, throttleMs]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, handleScroll]);

  return {
    containerRef,
    imageRef,
    scrollProgress,
  };
};
