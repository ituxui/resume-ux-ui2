import { useState } from 'react';
import { Button, InputUncontrolled } from '@components';
import styles from './EmailPart.module.scss';
import { MY_EMAIL } from '@shared/data';


export const EmailPart = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MY_EMAIL);
      setCopied(true);

      // Вернуть текст обратно через 2 секунды
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <InputUncontrolled />
      <Button
        accent='primary'
        face='solid'
        size='lg'
        onClick={handleCopy}
        width='full'
        iconName={copied ? 'check' : 'copy'}
      >
        {copied ? 'Скопировано!' : 'Скопировать email'}
      </Button>
      <Button
        accent='primary'
        face='solid'
        size='lg'
        href={`mailto:${MY_EMAIL}`}
        width='full'
      >
        Написать по почте
      </Button>
    </div>
  );
};
