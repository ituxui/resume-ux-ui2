// hooks/useDaysUntilBirthday.ts
import { useEffect, useState } from 'react';

/**
 * Правильное склонение слова "день": 1 день, 2 дня, 5 дней
 */
function pluralizeDays(days: number): string {
  const absDays = Math.abs(days);
  const lastTwo = absDays % 100;
  const lastOne = absDays % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return 'дней';
  if (lastOne === 1) return 'день';
  if (lastOne >= 2 && lastOne <= 4) return 'дня';
  return 'дней';
}

/**
 * Считает количество дней до ближайшего дня рождения
 */
function calculateDaysUntilBirthday(birthMonth: number, birthDay: number): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, birthMonth - 1, birthDay);
  nextBirthday.setHours(0, 0, 0, 0);

  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday = new Date(currentYear + 1, birthMonth - 1, birthDay);
    nextBirthday.setHours(0, 0, 0, 0);
  }

  const diffMs = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

interface UseDaysUntilBirthdayResult {
  days: number;
  text: string;
  isBirthday: boolean;
}

/**
 * Хук возвращает количество дней до ДР и готовую строку
 *
 * @param birthMonth - месяц рождения (1-12)
 * @param birthDay - день месяца рождения
 *
 * @example
 *   const { text } = useDaysUntilBirthday(3, 2); // "120 дней до ДР"
 */
export function useDaysUntilBirthday(
  birthMonth: number,
  birthDay: number
): UseDaysUntilBirthdayResult {
  const [days, setDays] = useState<number>(() =>
    calculateDaysUntilBirthday(birthMonth, birthDay)
  );

  useEffect(() => {
    // Пересчитываем при монтировании (на случай SSR/смены даты)
    setDays(calculateDaysUntilBirthday(birthMonth, birthDay));

    // Бонус: автообновление в полночь
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    const timer = setTimeout(() => {
      setDays(calculateDaysUntilBirthday(birthMonth, birthDay));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [birthMonth, birthDay]);

  const isBirthday = days === 0;
  const text = isBirthday
    ? 'Сегодня ДР! 🎉'
    : `${days} ${pluralizeDays(days)} до праздника`;

  return { days, text, isBirthday };
}
