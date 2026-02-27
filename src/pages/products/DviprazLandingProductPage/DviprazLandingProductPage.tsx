import { ProductCard } from "@pages/Landing/sections";
import { renderDescription, renderMeta, renderScreens } from "@pages/Landing/sections/ProductsSection/ProductsSection.utils";
import { dviprazPortalCompetitorsData, dviprazPortalPersons, } from "@shared/data";
import { uipCompetitorsData } from "@shared/data/competitors/uipCompetitors.data";
import { productsSection } from "@shared/data/ProductsSection.data";
import { Heading, Text } from "@shared/ui";
import { CompetitorsTable, List, ListItem, Persons, Screen } from "@shared/ui/components";
import { Gallery, Stack } from "@shared/ui/wrappers";


export function DviprazLandingProductPage() {
  return <>
    <Stack page="article" width='container' role="subsection">

      <ProductCard
        companyName={"ДВИПРАЗ"}
        projectName={"Многостраничный портал для Института"}
        description={renderDescription(['EdTech для Дальнего Востока: Как мы превратили сложный портал Института дополнительного профессионального образования в удобный сервис'])}
        // actions={renderActions(
        //   {
        //     actions: productsSection[1].actions,
        //     innerLink: productsSection[1].innerLink,
        //     mode: 'page',
        //   }
        // )}
        summaryItems={renderMeta(productsSection[2].meta)}
        gallery={renderScreens(productsSection[2].screens)}
        // projectPageUrl={productsSection[0].projectPageUrl}
        mode="page"
        logo={productsSection[2].logo}
      />
    </Stack>




    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        🎯 Челлендж
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Дальневосточный институт дополнительного образования (ДВИПРАЗ) — это огромный массив информации: сотни программ, расписания, документы, события.
          Старая структура контента создавала высокий порог входа. Пользователи терялись в разделах, не понимали, как записаться на курс, и не могли найти критически важную информацию (цены, сроки).
        </Text>
      </Stack>
    </Stack>



    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        🔍 Исследование и анализ
      </Heading>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Проблемы:
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem>Неясная структура контента изначально — множество разделов, сложно понять, где что находится</ListItem>
          <ListItem>Несогласованность информации между различными разделами сайта</ListItem>
          <ListItem>Высокая сложность восприятия информации для новых пользователей</ListItem>
        </List>
      </Stack>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Задачи:
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem>Изучение целевой аудитории (жители Дальнего Востока и не только, бизнесмены, работники, представители организаций)</ListItem>
          <ListItem>Анализ конкурентов (другие региональные порталы, государственные сайты).</ListItem>
          <ListItem>Сбор требований от заказчика</ListItem>
          <ListItem>Формирование гипотез о поведении пользователей</ListItem>
        </List>
      </Stack>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Решения:
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem>Проведение брифов и интервью с заказчиком</ListItem>
          <ListItem>Создание пользовательских сценариев и персон</ListItem>
          <ListItem>Исследование конкурентов</ListItem>
          <ListItem>Объединение тематически близких разделов</ListItem>
          <ListItem>Классификация и группировка информации по логическим блокам</ListItem>
        </List>
      </Stack>
    </Stack>

    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        🔍 Гипотетические прото-персоны
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Мы начали с гипотезы, что наш пользователь — это не просто «житель Дальнего Востока», а человек, ищущий конкретные возможности для карьерного роста.
        </Text>
      </Stack>
    </Stack>

    <Stack page="article" width='text' role="section">
      <Persons persons={dviprazPortalPersons} />
    </Stack>


    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        🕵️‍♂️ Исследование конкурентов
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Мы изучили игроков рынка: от крупных федеральных платформ (Академия Минпросвещения, Сириус) до локальных институтов (НИИДПО).
        </Text>
      </Stack>
    </Stack>

    <Stack page="article" width='full' role="subsection">
      <CompetitorsTable data={dviprazPortalCompetitorsData} />
    </Stack>






    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        Выводы из анализа конкурентов
      </Heading>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Проблема доверия
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <Text role='body'>
          Многие локальные сайты выглядят устаревшими, что подсознательно снижает доверие к качеству образования.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Мобильный трафик
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <Text role='body'>
          Федеральные конкуренты имеют отличные мобильные версии. Локальные — часто игнорируют адаптив.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="paragraph">
        <Heading role='group'>
          Структура
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <Text role='body'>
          Лучшие практики — это четкое разделение на «События» (вебинары, лекции) и «Фундаментальное образование» (курсы, программы). Мы решили внедрить это разделение.
        </Text>
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        🎨 UI Дизайн и Визуальный стиль
      </Heading>

      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Нужно было найти баланс между «Государственной надежностью» и «Современной дружелюбностью»:
        </Text>
      </Stack>
      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Цветовая палитра:</strong> Использовали спокойные, пастельные тона с акцентами. Это создает ощущение академичности, но без скуки «казенных» сайтов</ListItem>
          <ListItem><strong>Компоненты:</strong> Создали унифицированную систему карточек. Теперь карточка новости, события или курса выглядит в едином стиле, но имеет визуальные различия (теги, иконки), чтобы пользователь мгновенно считывал тип контента</ListItem>
          <ListItem><strong>Воздух:</strong> Добавили больше белого пространства, чтобы тексты программ (которые часто сложны для восприятия) читались легко</ListItem>
        </List>
      </Stack>
    </Stack>



    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        🧪 UX-тестирование: Кейс со списком документов
      </Heading>

      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Во время юзабилити-тестирования мы обнаружили критическую проблему.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          <strong>Проблема:</strong> В разделе с документами (лицензии, приказы) пользователи не понимали, как скачать файл. Списки выглядели просто как текст.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          <strong>Решение:</strong> Я переработал UI списка документов. Добавил явные иконки форматов (PDF, DOC), визуально выделил кликабельную область и добавил hover-эффекты.
        </Text>
      </Stack>

    </Stack>


    <Stack page="article" width='container' role="section">
      <Gallery>
        <Screen src="/projects/dvipraz/документы было full (3).png" alt="Было" size='1/3' addition={<Heading role='article'>Было</Heading>} scroll='static' />
        <Screen src="/projects/dvipraz/документы стало full (3).png" alt="Стало" size='1/3' addition={<Heading role='article'>Стало</Heading>} scroll='static' />
      </Gallery>
    </Stack>

    <Stack page="article" width='container' role="section">
      {' '}
    </Stack>
    <Stack page="article" width='container' role="section">
      {' '}
    </Stack>

    <Stack page="article" width='text' role="section">
      <Stack page="article" width='container' role="subsection">
        <Heading role='hero'>
          Результаты
        </Heading>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Нам удалось трансформировать сложную структуру института в понятный цифровой продукт. Мы получили следующий фидбек от заказчика:
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Структура:</strong> Пользователи теперь находят информацию о курсах быстрее благодаря логичной группировке. Стало значительно меньше обращений по поиску информации.</ListItem>
          <ListItem><strong>Вовлечение:</strong> Современный UI повысил доверие к институту как к передовой организации — субъективная оценка заказчика.</ListItem>
          <ListItem><strong>UI Kit:</strong> Создали просто и универсальный UI Kit, который используется в разработке новых секций сайта.</ListItem>
        </List>
      </Stack>
    </Stack>
  </>;
}
