// import { routeMap } from "@shared/routes";
import { Badge, BentoItem, EmojiText, Heading, Image, Text } from "@shared/ui/components";
import styles from './PersonalInformation.module.scss';
import { Icon } from "@shared/ui";
import { Stack } from "@shared/ui/wrappers";
import { useDaysUntilBirthday } from "@shared/hooks";
import { KhabarovskClock } from '@shared/ui/widgets/KhabarovskClock/KhabarovskClock';
import { Fireworks } from '@fireworks-js/react'
import { RobotoFlexAnimation } from "./RobotoFlexAnimation";
// import type { FireworksHandlers } from '@fireworks-js/react'

export function PersonalInformation() {

  const { text: birthdayCountdown } = useDaysUntilBirthday(3, 2);
  return (
    <>

      <div className={styles.header}>
        <Heading role="section" className={styles.heading}>Личная информация</Heading>
      </div>

      <div className={styles.bento}>


        <BentoItem
          marginMode="compact"
          className={styles['bento--birthday']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          <Fireworks
            options={{
              opacity: 0.5,
              hue: { min: 0, max: 360 },
              delay: { min: 100, max: 300 },

            }}
            style={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}

          />
          <Stack page="article" role="none" className={styles['bento--birthday__heading']}>
            {/* <Badge
              text={"Возраст"}      // Передаем текст из массива
              size="lg"        // Ваш фиксированный размер
            /> */}

            <Heading role="navigation-caption" className={styles['personality-type__heading']}>Возраст</Heading>
            <EmojiText src="/images/emoji/cake.png" alt="Торт" />
          </Stack>

          <Stack page="article" role="none" as="div" className={styles['bento--birthday__content']}>
            {/* <Heading role="feature" className={styles['bento--birthday__content__date']}>Возраст</Heading> */}
            <Heading role="hero" className={styles['bento--birthday__content__description']}>36 лет</Heading>
            <Text role="caption" className={styles['bento--birthday__content__date']}>День Рождения 2&nbsp;марта&nbsp;1990</Text>
            <Text role="caption" className={styles['bento--birthday__content__date']}>{birthdayCountdown}</Text>
          </Stack>

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['bento--personality-type']}
          // heading="Личная информация"
          // to={routeMap['aboutme-personal']['path']}
          href='https://www.16personalities.com/ru/профили/94736321ac094'
        >
          <Heading role="navigation-caption" className={styles['personality-type__heading']}>Тип личности</Heading>
          <Icon name="external-link" size="md" className={styles['bento--personality-type__content__heading__icon']} />

          <div className={styles['bento--personality-type__content']}>
            <Heading role="stat" className={styles['bento--personality-type__content__heading']}>Архитектор</Heading>

            <Heading role="feature">INTJ-T</Heading>

            <div className={styles['bento--personality-type__content__badges']}>

              {[
                "Логичный",
                "Организованный",
                "Любознательный",
                "Аналитик"
              ].map((item, index) => (
                <Badge
                  key={index}      // Обязательный уникальный ключ для React
                  text={item}      // Передаем текст из массива
                  size="lg"        // Ваш фиксированный размер
                  kind="outline"
                />
              ))}
            </div>


          </div>

        </BentoItem>
        <BentoItem
          marginMode="compact"
          className={styles['location-time']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >


          <KhabarovskClock
          // testHour={23} testMinute={0}
          />

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['marital-status']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          <Heading className={styles['marital-status--heading']} role="article">Женат, есть ребёнок</Heading>
          <div className={styles['marital-status--images']} >
            <Image src="/images/emoji/My daughter.png" className={{ container: styles.emoji }} zoomable={false} alt="Моя дочь" />
            <Image src="/images/emoji/My wife.png" className={{ container: styles.emoji }} zoomable={false} alt="Моя жена" />
            <Image src="/images/emoji/me.png" className={{ container: styles.emoji }} zoomable={false} alt="Я" />
          </div>
        </BentoItem>


        <BentoItem
          marginMode="compact"
          className={styles['knowledge-of-languages']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          <div className={styles['knowledge-of-languages--header']}>
            <Heading role="navigation-caption">Знание языков</Heading>
            <div className={styles['knowledge-of-languages--header__flags']}>
              <Image src="/images/emoji/flag-Russia.png" className={{ container: styles.flag }} zoomable={false} alt="flag of Russia" />
              <Image src="/images/emoji/flag-USA.png" className={{ container: styles.flag }} zoomable={false} alt="flag of USA" />
              <Image src="/images/emoji/flag-China.png" className={{ container: styles.flag }} zoomable={false} alt="flag of China" />
            </div>
          </div>

          <Text role='body' className={styles['knowledge-of-languages--content']}>
            Русский - родной<br />
            Английский - A2<br />
            Китайский - B1
          </Text>

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['favorite-font']}
          // heading="Личная информация"
          // to={routeMap['aboutme-personal']['path']}


          href='https://fonts.google.com/specimen/Roboto+Flex'
        >
          {/* <img src="/images/RobotoFlex.jpg" className={styles['favorite-font--img']} alt="Вариативный Roboto Flex" /> */}
          <div className={styles['favorite-font--text']}>
            <Heading role="navigation-caption">Любимый шрифт</Heading>
            <Icon name="external-link" size="md" className={styles['bento--personality-type__content__heading__icon']} />
          </div>

          <RobotoFlexAnimation />

        </BentoItem>


        {/* <BentoItem
          marginMode="compact"
          className={styles['personal-values']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          personal-values

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['family-status']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          family status

        </BentoItem>


        <BentoItem
          marginMode="compact"
          className={styles['contacts']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          contacts
        </BentoItem> */}
      </div>



    </>
  )
}
