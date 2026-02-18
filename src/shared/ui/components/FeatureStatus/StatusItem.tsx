
import { type FC, type ReactNode } from 'react';
import cn from 'classnames';
import { Icon, Text } from '@shared/ui';
import styles from './StatusItem.module.scss';

export type StatusItemType = 'success' | 'alert';

interface StatusItemProps {
  /** Основной текст элемента */
  text: ReactNode;
  /** Статус: зеленая галочка или красный крестик */
  status: StatusItemType;
  /** Дополнительное пояснение/вывод (показывается ниже со стрелкой) */
  note?: ReactNode;
  className?: string;
}

export const StatusItem: FC<StatusItemProps> = ({
  text,
  status,
  note,
  className
}) => {
  if (!text) return null;

  const statusIconName = status === 'success' ? 'circle-check' : 'circle-cross';

  return (
    <div className={cn(styles.item, className)}>
      {/* Основная строка */}
      <div className={styles.line}>
        <Icon
          name={statusIconName}
          size="lg"
          className={cn(styles.icon, styles[`icon--${status}`])}
        />
        <div className={styles.content}>
          <Text role="body">{text}</Text>
        </div>
      </div>

      {/* Строка с пояснением (опционально) */}
      {note && (
        <div className={styles.line}>
          <Icon
            name="arrow-right"
            size="lg"
            className={cn(styles.icon, styles['icon--arrow'])}
          />
          <div className={styles.content}>
            <Text role="body">{note}</Text>
          </div>
        </div>
      )}
    </div>
  );
};
