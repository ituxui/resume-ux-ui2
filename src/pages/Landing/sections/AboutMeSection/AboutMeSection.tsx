import Tilt from 'react-parallax-tilt';

import { Badge, BentoItem, Book, EmojiText, Heading, Image, Link, Nowrap, Pictogram, Screen, Text } from '@components';
import { booksItems, designSystemsItems, softwareItems, subscriptionsList, technologiesItems } from '@shared/data';

import styles from './AboutMeSection.module.scss';
import { Icon } from '@shared/ui';
import { PhysicsContainer } from '@wrappers';
import { SubscriptionsWidget } from './widgets/SubscriptionsWidget';



export function AboutMeSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading role="section" className={styles.heading}>
          Обо мне
        </Heading>
        <Text role="caption">Нажмите на элементы бенто</Text>
      </div>


      <div className={styles.container}>
        <div className={styles.left}>
          <Screen src="/images/my-photos/ezgif-5f4caa56e597afa9.jpg" alt="В офисе" scroll='static' className={styles['photo-1']} />
          <Screen src="/images/my-photos/ezgif-5d39d34362e9dde5.jpg" alt="Дедлайн" scroll='static' className={styles['photo-2']} />
        </div>



        <div className={styles.bento}>
          <BentoItem
            marginMode="compact"
            className={styles['bento--personal']}
            heading="Личная информация"
          >
            <EmojiText src="/images/emoji/cake.png" alt="В офисе">Возраст 35</EmojiText>
            <EmojiText src="/images/emoji/family.png" alt="В офисе">Женат и есть ребёнок</EmojiText>
            <EmojiText src="/images/emoji/東.png" alt="В офисе">Высшее образование переводчика английского и китайского языков</EmojiText>
            <EmojiText src="/images/emoji/army.png" alt="В офисе">Срочная служба в армии 1 год</EmojiText>
            <EmojiText src="/images/emoji/location.png" alt="В офисе">Нахожусь в Хабаровске (UTC +10)</EmojiText>
            <EmojiText src="/images/emoji/alarm.png" alt="В офисе">Желательное время работы до 13 МСК</EmojiText>
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--design-systems']}
            heading="Дизайн-системы"
          >

            <PhysicsContainer cursorForce={0.01} cursorRadius={100}>
              {designSystemsItems.map((item) => (
                <Badge key={item.id} text={item.phrase} href={item.href} imageAlt={item.alt} imageSrc={item.src} size="xl" />
              ))}
            </PhysicsContainer>
            {/* {designSystemsItems.map((item) => (
              <Pictogram key={item.id} alt={item.alt} src={item.src} size="sm">
                {item.phrase && <Link size="sm" href={item.href} phrase={item.phrase} invert />}
              </Pictogram>
            ))} */}
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--software']}
            heading="Программы"
          >
            {softwareItems.map((item) => (
              <Pictogram key={item.id} alt={item.alt} src={item.src} size="sm" face='island'>
                {item.phrase && <Link size="sm" href={item.href} phrase={item.phrase} invert />}
              </Pictogram>
            ))}
            <div className={styles.plus}><Icon size="sm" name="plus" /></div>
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--it-courses']}
          >
            <h3>30+</h3>
            <span>
              курсов пройдено по разным цифровым&#160;профессиям с 2019 года
            </span>
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--soft-skills']}
            heading="Софт-скиллы"
          >
            <Tilt
              className="parallax-effect-glare-scale"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.15}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              tiltReverse={true}
              transitionSpeed={1000}
            >

              <Pictogram alt="Adobe Creative Cloud" src="/images/emoji/me.png" size="sm" />
            </Tilt>
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--subscriptions']}
          >
            <div className={styles['bento--subscriptions-header']}>
              <Heading role='bento' className={styles['bento--subscriptions-heading']}>Подписки</Heading>
            </div>
            <div className={styles['bento--subscriptions-wrapper']}>
              <SubscriptionsWidget data={subscriptionsList} />
            </div>
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--books']}
            heading="Книги и другие сборники"
          >
            {booksItems.map((item) => (
              <Book key={item.id} alt={item.alt} src={item.src} size="free">
                {item.phrase && <Link size="sm" href={item.href} phrase={item.phrase} invert />}
              </Book>
            ))}
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--ai-tools']}
          >
            <Text role="bento">ИИ</Text>
            {/* <Text role="bento">инструменты</Text> */}
            {/* <Text role="bento">30+</Text> */}
          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--t-shape']}
          // heading="T-Shape технологии"
          >
            {technologiesItems.map((item) => (
              <Pictogram key={item.id} alt={item.alt} src={item.src} size="sm">
                {item.phrase && <Link size="sm" href={item.href} phrase={item.phrase} invert />}
              </Pictogram>
            ))}
            <Heading role="bento" className={styles['bento--t-shape--heading']}>
              <span>T</span><span>shape</span>
            </Heading>

          </BentoItem>

          <BentoItem
            marginMode="compact"
            className={styles['bento--preferences']}
            heading={<>Пожелания <Nowrap>к компании</Nowrap></>}
          >
            <Text role="bento">Мы сработаемся</Text>
            <Image
              src={'/images/emoji/thumbs up.png'}
              zoomable={false}

              className={
                { container: styles['bento--preferences-imageContainer'], }}
            />

          </BentoItem>
        </div>

        <div className={styles.right}>
          <Screen src="/images/my-photos/ezgif-268b656bf08a07f7.jpg" alt="Выступаю" scroll='static' className={styles['photo-3']} />
          <Screen src="/images/my-photos/ezgif-5791ef184acbb522.jpg" alt="В офисе" scroll='static' className={styles['photo-4']}
          />
        </div>
      </div>

    </div>
  );
}
