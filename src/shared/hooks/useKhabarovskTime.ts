// hooks/useKhabarovskTime.ts
import { useEffect, useState, useRef } from 'react';

const KHABAROVSK_OFFSET_HOURS = 10; // GMT+10

interface UseKhabarovskTimeParams {
  /** Тестовый час (0-23). Если указан — реальное время не используется */
  testHour?: number;
  /** Тестовая минута (0-59) */
  testMinute?: number;
}

interface UseKhabarovskTimeResult {
  /** Часы в 24-часовом формате (0-23) */
  hours24: number;
  /** Минуты (0-59) */
  minutes: number;
  /** Отформатированное время: "09:41" или "13:41" */
  formattedTime: string;
  /** Суффикс "AM" для утра/дня, пустая строка для вечера */
  suffix: string;
  /** Прогресс дня от 0 до 1 (для позиционирования красной точки) */
  dayProgress: number;
}

/**
 * Возвращает текущее время в Хабаровске (GMT+10).
 * Обновляется каждую секунду, синхронизируется с реальным временем каждые 60 сек.
 */
export function useKhabarovskTime(
  params: UseKhabarovskTimeParams = {}
): UseKhabarovskTimeResult {
  const { testHour, testMinute } = params;
  const isTestMode = testHour !== undefined && testMinute !== undefined;

  /** Получаем актуальное время в Хабаровске через UTC + смещение */
  const getKhabarovskDate = (): Date => {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    return new Date(utcMs + KHABAROVSK_OFFSET_HOURS * 60 * 60 * 1000);
  };

  const getInitialDate = (): Date => {
    if (isTestMode) {
      const d = new Date();
      d.setHours(testHour!, testMinute!, 0, 0);
      return d;
    }
    return getKhabarovskDate();
  };

  const [currentDate, setCurrentDate] = useState<Date>(getInitialDate);
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // В тестовом режиме просто фиксируем время, без тиков
    if (isTestMode) {
      const d = new Date();
      d.setHours(testHour!, testMinute!, 0, 0);
      setCurrentDate(d);
      return;
    }

    // Сразу синхронизируемся
    setCurrentDate(getKhabarovskDate());

    // Тик каждую секунду — прибавляем 1 секунду к текущему стейту
    tickIntervalRef.current = setInterval(() => {
      setCurrentDate((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    // Синхронизация с реальным временем каждые 60 секунд (избегаем дрифта)
    syncIntervalRef.current = setInterval(() => {
      setCurrentDate(getKhabarovskDate());
    }, 60_000);

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    };
  }, [isTestMode, testHour, testMinute]);

  const hours24 = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Форматирование времени
const isAm = hours24 >= 0 && hours24 <= 12;
const displayHours = hours24; // ← больше не превращаем 0 в 12
const formattedTime = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
const suffix = isAm ? 'AM' : '';

  // Прогресс дня: для красной точки на полоске 0-24
  const dayProgress = (hours24 * 60 + minutes) / (24 * 60);

  return {
    hours24,
    minutes,
    formattedTime,
    suffix,
    dayProgress,
  };
}
