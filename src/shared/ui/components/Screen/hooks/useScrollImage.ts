import { useEffect, useRef, useCallback } from 'react';

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
  throttleMs = 800,
}: UseScrollImageOptions): UseScrollImageReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef(0);
  const lastCallRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageOverflowRef = useRef(0);
  const canScrollRef = useRef(false);

  const calcOverflow = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const image = imageRef.current;

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const imageNaturalHeight = image.naturalHeight;
    const imageNaturalWidth = image.naturalWidth;

    if (imageNaturalWidth === 0) return;

    const scaledImageHeight = (containerWidth / imageNaturalWidth) * imageNaturalHeight;
    const overflow = scaledImageHeight - containerHeight;

    imageOverflowRef.current = Math.max(0, overflow);
    canScrollRef.current = overflow > 0;
  }, []);

  const applyTransform = useCallback(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image || !canScrollRef.current) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const topPositionVh = (rect.top / viewportHeight) * 100;

    const startPoint = startThreshold;
    const endPoint = -(endThreshold - startThreshold);
    const range = startPoint - endPoint;

    let progress = 0;
    if (topPositionVh <= startPoint) {
      progress = (startPoint - topPositionVh) / range;
    }
    progress = Math.max(0, Math.min(1, progress));

    if (Math.abs(progress - progressRef.current) < 0.001) return;

    progressRef.current = progress;

    const translateY = -progress * imageOverflowRef.current;
    image.style.transform = `translateY(${translateY}px)`;
  }, [startThreshold, endThreshold]);

  const handleScroll = useCallback(() => {
    if (!enabled || !canScrollRef.current) return;

    const now = Date.now();
    const elapsed = now - lastCallRef.current;

    if (elapsed >= throttleMs) {
      // Прошло достаточно времени — применяем сразу
      lastCallRef.current = now;
      applyTransform();
    } else {
      // Ещё рано — ставим отложенный вызов на конец тротлинга
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        applyTransform();
      }, throttleMs - elapsed);
    }
  }, [enabled, throttleMs, applyTransform]);

  useEffect(() => {
    if (!enabled) return;

    const image = imageRef.current;
    if (!image) return;

    const onLoad = () => {
      calcOverflow();
      applyTransform();
    };

    if (image.complete && image.naturalHeight > 0) {
      onLoad();
    } else {
      image.addEventListener('load', onLoad);
    }

    return () => {
      image.removeEventListener('load', onLoad);
    };
  }, [enabled, calcOverflow, applyTransform]);

  useEffect(() => {
    if (!enabled) return;

    const onResize = () => {
      calcOverflow();
      applyTransform();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled, handleScroll, calcOverflow, applyTransform]);

  return {
    containerRef,
    imageRef,
    scrollProgress: progressRef.current,
  };
};
