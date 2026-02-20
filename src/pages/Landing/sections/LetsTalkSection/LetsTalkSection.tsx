

import styles from './LetsTalkSection.module.scss';
import { EmailPart } from '@shared/ui/widgets';
import { Heading, Link, Nowrap, Popover, } from '@components';


export function LetsTalkSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading role="section" className={styles.heading}>
            Поговорим <Nowrap>о Вашем</Nowrap> проекте?
          </Heading>
        </div>

        <div className={styles.content}>
          <Popover
            trigger={<Link phrase="Email" size="sm" />}
            content={
              <div className={styles.popoverContent}>
                <EmailPart />
              </div>
            }
          />

          <Link phrase="Телеграм" href="https://t.me/Rumar1" size="sm" />
          <Link phrase="Вконтакте" href="https://vk.com/im/convo/16759075?entrypoint=list_all" size="sm" />
          <Link phrase="Max" href="https://max.ru/u/f9LHodD0cOJG5yySL7VLbp-sA3n4FO6R1DBs_xxekQ7dvzkrUA4XxhNNht4" size="sm" />

        </div>
      </div>
    </div>
  );
}
