import { useRef } from 'react';
import cn from 'classnames';
import { Heading, Icon, Link, Text } from "@shared/ui";
import { useArrowVisibility } from '@hooks/useArrowVisibility';
import styles from './Hero.module.scss';
import { Button, Image, Nowrap, Popover } from '@components';
import { EmailPart } from '@shared/ui/widgets';
import { RESUME_URL } from '@shared/data';
import { Stack } from '@shared/ui/wrappers';

export function Hero() {
  const arrowRef = useRef<HTMLDivElement>(null);

  const isArrowHidden = useArrowVisibility(arrowRef, {
    threshold: 0.8,
    debounceDelay: 50,
    minScreenHeight: 600
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading role="hero">Привет! <Nowrap>Я Юрий</Nowrap></Heading>

        <Image
          src={"/images/my-photos/ava.png"}
          className={{
            image: styles.ava,
            container: styles.avaContainer
          }}
          alt="Avatar"
        />

        <div>
          <Text role="subheading">
            Проектировщик ПО / ПИ (UX / UI) <Nowrap>с официальным</Nowrap> стажем <strong><Nowrap>2 года</Nowrap></strong> и <strong><Nowrap>T-shaped</Nowrap></strong> знаниями фулстек программирования. Реализовал <Nowrap><strong>10+ многостраничных</strong></Nowrap> приложений <Nowrap>за время</Nowrap> работы <Nowrap>в группе</Nowrap> 4-х компаний, реализующие <Nowrap>как собственные</Nowrap> IT-продукты, так и продукты <Nowrap>для клиентов</Nowrap>.
          </Text>
        </div>
        {/* <div className={styles.links}>
          <Link phrase="Портфолио" href="#features" size="sm" />
          <Link phrase="Обо мне" href="#features" size="sm" />
          <Link phrase="Скачать резюме" href="/files/resume-ux-ui.vercel.app.pdf" size="sm" />
        </div> */}
        <div className={styles.talkAboutYourProduct}>
          <Stack page='landing' role='paragraph'>
            <Text role="subheading">Поговорим <Nowrap>о Вашем</Nowrap> продукте?</Text>
          </Stack>
          <Button accent="primary" face="solid" size="lg" width="auto" download href={RESUME_URL} iconName="download" content="text-icon">
            Скачать резюме
          </Button>
          {/* <div className={cn(styles.links, styles.contacts)}>
            <Popover
              trigger={<Link phrase="Email" size="sm" />}
              content={
                <EmailPart />
              }
            />

            <Link phrase="Телеграм" href="https://t.me/Rumar1" size="sm" />
            <Link phrase="Вконтакте" href="https://vk.com/im/convo/16759075?entrypoint=list_all" size="sm" />
            <Link phrase="Max" href="https://max.ru/u/f9LHodD0cOJG5yySL7VLbp-sA3n4FO6R1DBs_xxekQ7dvzkrUA4XxhNNht4" size="sm" />
          </div> */}
        </div>
      </div>
      <div
        ref={arrowRef}
        className={cn(styles.arrowDown, {
          [styles.arrowDown_hidden]: isArrowHidden
        })}
      >
        <Icon name="arrow-down" size="xxxl" />
      </div>
    </div >
  );
}
