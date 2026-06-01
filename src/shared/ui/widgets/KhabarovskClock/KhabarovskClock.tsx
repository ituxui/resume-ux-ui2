// components/KhabarovskClock/KhabarovskClock.tsx

import { useKhabarovskTime } from '@shared/hooks';
import styles from './KhabarovskClock.module.scss';
import { Heading, Text } from '@shared/ui';

interface KhabarovskClockProps {
  testHour?: number;
  testMinute?: number;
}

const TIMELINE_MARKS = [0, 6, 12, 18, 24]; // ← равномерный шаг 6 часов

export const KhabarovskClock = ({ testHour, testMinute }: KhabarovskClockProps) => {
  const { formattedTime, suffix, dayProgress } = useKhabarovskTime({
    testHour,
    testMinute,
  });

  return (
    <div className={styles.clock}>
      <div className={styles.header}>
        <Heading role="navigation-widget" className={styles.heading}>Я в Хабаровске</Heading>
        <Text role='body' className={styles.gmt}>GMT +10</Text>
      </div>

      {/* Красная точка над временем */}
      <div className={styles.dotWrapper}>
        <div
          className={styles.verticalLine}
          style={{ left: `${dayProgress * 100}%` }}
        />
        <div
          className={styles.dot}
          style={{ left: `${dayProgress * 100}%` }}
        />
      </div>

      {/* Само время */}
      <div className={styles.timeRow}>
        <Text role='body' className={styles.time}>
          {formattedTime}
        </Text>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>

      {/* Полоска шкалы с отметками */}
      <div className={styles.timeline}>
        <div className={styles.line} />
        <div className={styles.marks}>
          {TIMELINE_MARKS.map((mark) => (
            <span
              key={mark}
              className={styles.mark}
              style={{ left: `${(mark / 24) * 100}%` }}  // ← реальная доля
            >
              {mark}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
