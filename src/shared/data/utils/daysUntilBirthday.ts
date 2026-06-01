// utils/daysUntilBirthday.ts

/**
 * Правильное склонение слова "день" в зависимости от числа
 * 1 день, 2 дня, 5 дней, 21 день, 22 дня, 25 дней
 */
export function pluralizeDays(days: number): string {
  const absDays = Math.abs(days);
  const lastTwo = absDays % 100;
  const lastOne = absDays % 10;

  // Исключения: 11-14 всегда "дней"
  if (lastTwo >= 11 && lastTwo <= 14) return 'дней';
  if (lastOne === 1) return 'день';
  if (lastOne >= 2 && lastOne <= 4) return 'дня';
  return 'дней';
}

/**
 * Считает количество дней до ближайшего дня рождения
 * @param birthMonth - месяц (1-12)
 * @param birthDay - день месяца
 */
export function getDaysUntilBirthday(birthMonth: number, birthDay: number): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, birthMonth - 1, birthDay);
  nextBirthday.setHours(0, 0, 0, 0);

  // Если ДР в этом году уже прошёл — берём следующий год
  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday = new Date(currentYear + 1, birthMonth - 1, birthDay);
    nextBirthday.setHours(0, 0, 0, 0);
  }

  const diffMs = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
