// import { routeMap } from "@shared/routes";
import { Badge, BentoItem, EmojiText, Heading } from "@shared/ui/components";
import styles from './PersonalInformation.module.scss';
import { Icon } from "@shared/ui";
import { Stack } from "@shared/ui/wrappers";
import { useDaysUntilBirthday } from "@shared/hooks";
import { KhabarovskClock } from '../../../../../shared/ui/widgets/KhabarovskClock/KhabarovskClock';


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
          className={styles['bento--personality-type']}
          // heading="Личная информация"
          // to={routeMap['aboutme-personal']['path']}
          href='https://www.16personalities.com/ru/профили/94736321ac094'
        >
          <Heading role="navigation-caption">Тип личности</Heading>
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
                />
              ))}
            </div>


          </div>

        </BentoItem>
        <BentoItem
          marginMode="compact"
          className={styles['bento--birthday']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          <Stack page="article" role="none" className={styles['bento--birthday__heading']}>
            <Badge
              text={birthdayCountdown}      // Передаем текст из массива
              size="lg"        // Ваш фиксированный размер
            />
            <EmojiText src="/images/emoji/cake.png" alt="Торт" />
          </Stack>

          <Stack page="article" role="none" as="div" className={styles['bento--birthday__content']}>
            <Heading role="feature" className={styles['bento--birthday__content__date']}>День Рождения</Heading>
            <Heading role="navigation-widget" className={styles['bento--birthday__content__description']}>02.03.1990 • 36 лет</Heading>
          </Stack>

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
          marital-status

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['photo']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          photo

        </BentoItem>


        <BentoItem
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
          className={styles['knowledge-of-languages']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          knowledge of languages

        </BentoItem>

        <BentoItem
          marginMode="compact"
          className={styles['contacts']}
        // heading="Личная информация"
        // to={routeMap['aboutme-personal']['path']}
        >
          contacts
        </BentoItem>
      </div>



    </>
  )
}
