import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// useScrollLock
// ═══════════════════════════════════════════════════════════════════════════
//
// Блокирует скролл страницы БЕЗ скрытия скроллбара.
//
// Принцип: при каждом событии scroll мгновенно возвращаем window.scrollTo
// на сохранённую позицию. Скроллбар остаётся, контент не прыгает.
//
// Покрытые кейсы:
//   ✓ Колёсико мыши
//   ✓ Тачпад (двумя пальцами)
//   ✓ Тач-скролл на мобильных (touch-action: none на overlay)
//   ✓ Клавиши (Space, PgUp, PgDown, Home, End, стрелки)
//   ✓ Drag скроллбара мышью
//   ✓ Программный scrollTo из других скриптов
//   ✓ iOS Safari
//   ✓ Вложенный скролл внутри overlay (не блокируется)
//   ✓ Размонтирование компонента (cleanup)
// ═══════════════════════════════════════════════════════════════════════════

/** Клавиши, вызывающие скролл страницы */
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Space',
  ' ',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

export const useScrollLock = (isLocked: boolean) => {
  const savedPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isLocked) return;

    // ─── Сохраняем позицию при активации ─────────────────────────
    savedPosition.current = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const scrollX = savedPosition.current.x;
    const scrollY = savedPosition.current.y;

    // ─── 1. Перехват scroll — мгновенный возврат ─────────────────
    const handleScroll = () => {
      window.scrollTo(scrollX, scrollY);
    };

    // ─── 2. Блокировка колёсика мыши ─────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      // Разрешаем скролл внутри overlay (у него свой overflow-y: auto)
      const target = e.target as HTMLElement;
      if (target.closest('[data-scroll-allow]')) return;

      e.preventDefault();
    };

    // ─── 3. Блокировка touch-скролла ─────────────────────────────
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-scroll-allow]')) return;

      e.preventDefault();
    };

    // ─── 4. Блокировка клавиш скролла ────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) {
        // Разрешаем если фокус внутри input/textarea
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        // Разрешаем внутри overlay
        const target = e.target as HTMLElement;
        if (target.closest('[data-scroll-allow]')) return;

        e.preventDefault();
      }
    };

    // ─── Подписки ────────────────────────────────────────────────
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLocked]);
};
