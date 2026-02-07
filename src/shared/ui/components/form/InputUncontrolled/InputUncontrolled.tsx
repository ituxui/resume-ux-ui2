import { Text } from '@components';
import styles from './InputUncontrolled.module.scss';
import { MY_EMAIL } from '@shared/data';
import type { MouseEvent } from 'react';

export const InputUncontrolled = () => {
  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return <label className={styles.wrapper}>
    <Text role='description'>Email</Text>
    <input
      readOnly
      onClick={handleClick}
      className={styles.input}
      value={MY_EMAIL}
    />
  </label>;
}
