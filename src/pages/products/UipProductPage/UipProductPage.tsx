import { renderActions, renderDescription, renderMeta, renderScreens } from '@pages/Landing/sections/ProductsSection/ProductsSection.utils';
import { productsSection } from '@pages/Landing/sections/ProductsSection/ProductsSection.data';
import { ProductCard } from '@pages/Landing/sections';
import classNames from 'classnames';
import { Heading, Text } from '@shared/ui';
import styles from './UipProductPage.module.scss';
import { List, ListItem, Persons, Screen, } from '@components';
import { Gallery, Stack } from '@shared/ui/wrappers';
import { uipPersons } from '@shared/data';
import { CompetitorsSection } from './sections/CompetitorsSection';

export function UipProductPage() {

  // Добавь для отладки:
  console.log('styles:', styles);
  console.log('wrapper:', styles.wrapper);

  return (
    <div className={classNames(styles.wrapper)}>


      <Stack page="article" width='container' role="subsection" className={styles.hero}>

        <ProductCard
          companyName={"УИП"}
          projectName={"Многостраничный портал застройщика"}
          description={renderDescription(['Многостраничный информационный портал. Предоставляет информацию о жилых комплексах, коммерческих объектах и новостях компании. Включает в себя каталог объектов с фильтрами, страницы отдельных жилых комплексов, новости и акции компании, персональные разделы для каждого объекта недвижимости.'])}
          actions={renderActions(
            {
              actions: productsSection[0].actions,
              innerLink: productsSection[0].innerLink,
              mode: 'page',
            }
          )}
          summaryItems={renderMeta(productsSection[0].meta)}
          gallery={renderScreens(productsSection[0].screens)}
          // projectPageUrl={productsSection[0].projectPageUrl}
          mode="page"
          logo={productsSection[0].logo}
        />
      </Stack>


      <Stack page="article" width='text' role="subsection">
        <Heading role='section'>
          Кратко
        </Heading>
        <Text role='body'>
          В этом проекте я был ведущим UX UI дизайнером и плотно работал с продуктовым менеджером и программистами.
        </Text>
        <Text role='body'>
          Разработав информационный портал для компании застройщика, мы достигли следующих целей:
        </Text>
        <List role='body'>
          <ListItem>Формирование доверия к бренду через портфолио, отзывы и профессиональный дизайн</ListItem>
          <ListItem>Привлечение потенциальных клиентов тронулось с места, потому что предыдущие лендинги не вызывали доверия</ListItem>
          <ListItem>Сделали удобный и расширяемый портал для компании</ListItem>
        </List>
      </Stack>


      <Stack page="article" width='container' role="section">

        <Gallery>
          <Screen src="/projects/uip/page/Hero и о застройщике.png" alt="Hero и о застройщике" postfix="Hero и о застройщике" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/ЖК и другие проекты.png" alt="Жилые комплексы и другие проекты" postfix="Жилые комплексы и другие проекты" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/Новости и акции.png" alt="Новости и акции" postfix="Новости и акции" size='1/3' scroll='parallax' />
        </Gallery>
      </Stack>



      <Stack page="article" width='text' role="subsubsection">
        <Heading role='section'>
          Гипотетические прото-персоны на основе экспертных оценок
        </Heading>
        <Text role='body'>
          Основываясь на анализе конкурентов, переговоров с заказчиками и общих знаниях о рынке недвижимости, я выделил 5 ключевых сегментов аудитории, чтобы проверить свои дизайн-решения на разных сценариях
        </Text>
      </Stack>


      <Stack page="article" width='text' role="section">
        <Persons persons={uipPersons} />
      </Stack>



      <Stack page="article" width='text' role="subsubsection">
        <Heading role='section'>
          Анализ прямых и косвенных конкурентов
        </Heading>
        <Text role='body'>
          Провели анализ, чтобы выявить их сильные и слабые стороны, лучшие практики UX/UI, функционал, структуру и подходы к подаче информации.
        </Text>
      </Stack>



      <Stack page="article" width='full' role="subsection">
        <CompetitorsSection />
      </Stack>





      <Stack page="article" width='text' role="section">
        <Heading role='section'>
          Выводы из анализа конкурентов
        </Heading>

        <Stack page="article" width='text' role="subsection">
          <Heading role='subsection'>
            Инсайт #1: Нужна планировка
          </Heading>
          <Text role='body'>
            Анализ конкурентов показал разрыв: красивые рендеры ЖК живут отдельно от цен и планировок.
            Мы объединили эти сущности. В карточке ЖК пользователь видит планировку к каждой квартире. А в карточке квартиры мы добавили контекст инфраструктуры (школы, магазины), чтобы не заставлять пользователя возвращаться на страницу ЖК.
          </Text>
        </Stack>

        <Stack page="article" width='text' role="subsection">
          <Heading role='subsection'>
            Инсайт #2: Доказательный дизайн (Evidence-based UI)
          </Heading>
          <Text role='body'>
            Люди верят не маркетинговым текстам, а документам и статусам.
            Вместо того чтобы прятать «Ход строительства» и «Документацию» в подвал (как у региональных конкурентов), мы вынесли динамику стройки и статус на первый план. Это превращает сайт из «витрины» в рабочий инструмент, повышая доверие к бренду как к открытому застройщику.
          </Text>
        </Stack>

        <Stack page="article" width='text' role="subsection">
          <Heading role='subsection'>
            Инсайт #3: Принцип прогрессивного раскрытия (Progressive Disclosure)
          </Heading>
          <Text role='body'>
            Пользователь не ищет сразу «высоту потолков» или «вид из окна». Первичный сценарий всегда базируется на четырёхугольнике: Цена — ЖК — Комнатность — Площадь.
            Мы оставили эти основные фильтры. Это снизило время до первого целевого действия (просмотра выдачи).
          </Text>
        </Stack>
      </Stack>



      <Stack page="article" width="text" role="section">
        <Heading role="section">
          Проектирование информационной архитектуры
        </Heading>

        {/* ─── Структура портала ──────────────────────────────────── */}
        <Stack page="article" width="text" role="subsection">
          <Heading role="subsection">
            Структура портала
          </Heading>
          <List>
            <ListItem>Главная страница застройщика — точка входа, навигация по ЖК, акциям, новостям</ListItem>
            <ListItem>Лендинг жилого комплекса — презентация конкретного дома: генплан, ход строительства, инфраструктура, документация</ListItem>
            <ListItem>Каталог квартир — фильтрация по цене, площади, этажу, количеству комнат, типу отделки</ListItem>
            <ListItem>Карточка квартиры — планировка, шахматка, цена, кнопки связи (звонок, модальное окно, мессенджер)</ListItem>
            <ListItem>Каталог коммерческих помещений — отдельный раздел с фильтрами по назначению и площади</ListItem>
            <ListItem>Раздел новостей — общие новости застройщика + фильтр по конкретному ЖК</ListItem>
            <ListItem>Раздел акций — действующие предложения по всем домам и по каждому ЖК отдельно</ListItem>
            <ListItem>Страница «О застройщике» — история, лицензии, проектные декларации, контакты</ListItem>
          </List>
        </Stack>

        {/* ─── User Flows ─────────────────────────────────────────── */}
        <Stack page="article" width="text" role="subsection">
          <Heading role="section">
            Пользовательские сценарии (User Flows)
          </Heading>

          {/* Покупатель квартиры */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Покупатель квартиры
            </Heading>
            <List>
              <ListItem>
                Главная → Каталог квартир → Фильтры (комнаты, цена, этаж) → Карточка квартиры → Планировка → Запрос звонка через модальное окно
              </ListItem>
              <ListItem>
                Главная → Лендинг ЖК → Генплан → Выбор корпуса → Шахматка этажей → Карточка квартиры → Написать в WhatsApp
              </ListItem>
              <ListItem>
                Главная → Акции → «Скидка на двушки в ЖК Восточный Ветер» → Лендинг ЖК → Каталог квартир с предустановленным фильтром → Карточка → Заявка
              </ListItem>
            </List>
          </Stack>

          {/* Ипотечник */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Покупатель с ипотекой
            </Heading>
            <List>
              <ListItem>
                Главная → Раздел «Ипотека» → Калькулятор (первый взнос, срок, ставка) → Подходящие квартиры → Карточка → Консультация по телефону
              </ListItem>
              <ListItem>
                Лендинг ЖК → Блок «Способы покупки» → Военная ипотека → Условия и документы → Запись на консультацию через модальное окно
              </ListItem>
              <ListItem>
                Акции → «Семейная ипотека от 6%» → Калькулятор с предустановленной ставкой → Выбор квартиры → Заявка через мессенджер
              </ListItem>
            </List>
          </Stack>

          {/* Инвестор */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Инвестор
            </Heading>
            <List>
              <ListItem>
                Главная → Каталог квартир → Сортировка по цене за м² → Сравнение 2–3 вариантов → Карточка → Звонок менеджеру
              </ListItem>
              <ListItem>
                Лендинг ЖК → Ход строительства (фотоотчёты, камеры) → Сроки сдачи → Каталог свободных квартир → Заявка на несколько лотов
              </ListItem>
            </List>
          </Stack>

          {/* Новости и доверие */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Формирование доверия
            </Heading>
            <List>
              <ListItem>
                Главная → Новости → «Сдан корпус №3 ЖК Восточный Ветер» → Фотоотчёт → Лендинг ЖК → Свободные квартиры
              </ListItem>
              <ListItem>
                Главная → О застройщике → Построенные объекты → Проектные декларации → Лендинг нового ЖК → Каталог
              </ListItem>
              <ListItem>
                Поисковая выдача → Страница акции → Условия → Лендинг ЖК → Квартира → Заявка
              </ListItem>
            </List>
          </Stack>

          {/* Коммерческая недвижимость */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Предприниматель (коммерция)
            </Heading>
            <List>
              <ListItem>
                Главная → Коммерческие помещения → Фильтры (площадь, этаж, назначение) → Карточка помещения → Планировка → Запрос условий аренды через модальное окно
              </ListItem>
              <ListItem>
                Лендинг ЖК → Блок «Коммерция на первых этажах» → Доступные помещения → Карточка → Звонок
              </ListItem>
            </List>
          </Stack>

          {/* Мобильные сценарии */}
          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Мобильный пользователь
            </Heading>
            <List>
              <ListItem>
                Рекламное объявление → Лендинг ЖК (мобильная версия) → Свайп по планировкам → Tap «Написать в ВК» → Диалог с менеджером
              </ListItem>
              <ListItem>
                Push-уведомление «Новая акция» → Страница акции → Кнопка «Позвонить» (tel:) → Разговор с менеджером
              </ListItem>
            </List>
          </Stack>

        </Stack>
      </Stack>

      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Разработка UI Kit
          </Heading>
          <Text role='body'>
            Для удобного программирования, поддержки и масштабирования разработали 1653 локальных компонентов Figma, включая их вариации, секции и виджеты
          </Text>

        </Stack>

        <Stack page="article" width="full" role="subsubsection">
          <Gallery columns={2}>
            <Screen src="/projects/uip/page/UIP components.png" alt="Компоненты UIP UI-kit" postfix="Компоненты" size='3/3' scroll='static' />
            <Screen src="/projects/uip/page/UIP colors fonts etc.png" alt="Цвета, шрифты UIP UI-kit" postfix="Цвета, шрифты, эмблемы, иконки" size='3/3' scroll='static' />
          </Gallery>
        </Stack>
      </Stack>



      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Упрощение процесса взаимодействия
          </Heading>



          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Инсайт #1: Меньше полей — выше конверсия
            </Heading>
            <Text role='body'>
              Каждое дополнительное поле в форме снижает конверсию на ~7-10%.
            </Text>
            <Text role='body'>
              Решение: Сократил форму до 2 обязательных полей (ФИО + телефон). Остальную информацию менеджер уточнит при звонке — это комфортнее для пользователя и не снижает качество лида.
            </Text>
          </Stack>


          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Инсайт #2: Пользователь хочет выбор канала связи
            </Heading>
            <Stack page="article" width="text" role="paragraph">
              <Text role='body'>
                Разные сегменты аудитории предпочитают разные способы коммуникации: молодёжь — мессенджеры, старшее поколение — телефон.
              </Text>
              <Text role='body'>
                Решение: В модальном окне предусмотрел 3 варианта связи:
              </Text>
            </Stack>


            <Stack page="article" width="text" role="none">
              <List>
                <ListItem>
                  📝 Форма заявки (перезвонят)
                </ListItem>
                <ListItem>
                  📞 Прямой номер телефона
                </ListItem>
                <ListItem>
                  💬 Ссылка на VK (для тех, кому удобнее писать)
                </ListItem>
              </List>
            </Stack>
          </Stack>


          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Инсайт #3: Фиксированный CTA повышает доступность действия
            </Heading>
            <Text role='body'>
              Пользователи часто «теряют» кнопку связи при скролле длинных страниц каталога.
            </Text>
            <Text role='body'>
              Решение: Добавил фиксированную кнопку в правом нижнем углу экрана. Она всегда доступна — неважно, на какой секции страницы находится пользователь.
            </Text>
          </Stack>

        </Stack>

        <Stack page="article" width="container" role="subsubsection">
          <Gallery columns={3}>
            <Screen src="/projects/uip/page/Модальные окна связи мобильный дизайн.png" alt="Модальное окно в мобильном дизайне" postfix="Компоненты" size='1/3' scroll='parallax' />
            <Screen src="/projects/uip/page/Модальные окна связи ПК.png" alt="Модальное окно в ПК дизайне" postfix="Цвета, шрифты, эмблемы, иконки" size='2/3' scroll='parallax' />
          </Gallery>
        </Stack>
      </Stack>

    </div>);
}
