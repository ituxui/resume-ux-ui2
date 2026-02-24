import { useEffect, useState, type RefObject } from 'react';

function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

interface UseArrowVisibilityOptions {
  threshold?: number;
  debounceDelay?: number;
  minScreenHeight?: number;
}

export function useArrowVisibility(
  ref: RefObject<HTMLElement | null>,
  options: UseArrowVisibilityOptions = {}
) {
  const {
    threshold = 0.5,
    debounceDelay = 50,
    minScreenHeight = 600
  } = options;

  const [isHidden, setIsHidden] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsEnabled(window.innerHeight >= minScreenHeight);
    };

    const handleScroll = () => {
      if (!ref.current || !isEnabled) return;

      const rect = ref.current.getBoundingClientRect();
      const thresholdPx = window.innerHeight * threshold;

      setIsHidden(rect.top <= thresholdPx);
    };

    const debouncedScroll = debounce(handleScroll, debounceDelay);
    const debouncedResize = debounce(() => {
      checkScreenHeight();
      handleScroll();
    }, debounceDelay);

    checkScreenHeight();
    handleScroll();

    window.addEventListener('scroll', debouncedScroll);
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [ref, threshold, debounceDelay, minScreenHeight, isEnabled]);

  return isEnabled ? isHidden : false;
}
