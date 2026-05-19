import { renderActions, renderDescription, renderMeta, renderScreens } from '@pages/Landing/sections/ProductsSection/ProductsSection.utils';
import { productsMap, } from '@shared/data/ProductsSection.data';
import { ProductCard } from '@pages/Landing/sections';
import { Heading, Text } from '@shared/ui';
import { List, ListItem, Persons, Screen, StatusItem, } from '@components';
import { Gallery, Stack } from '@shared/ui/wrappers';
import { uipPersons } from '@shared/data';
import { CompetitorsSection } from './sections/CompetitorsSection';

export function UipProductPage() {

  return (
    <>


      <Stack page="article" width='container' role="subsection">

        <ProductCard
          companyName={"УИП"}
          projectName={"Многостраничный портал застройщика"}
          description={renderDescription(['Многостраничный информационный портал. Предоставляет информацию о жилых комплексах, коммерческих объектах и новостях компании. Включает в себя каталог объектов с фильтрами, страницы отдельных жилых комплексов, новости и акции компании, персональные разделы для каждого объекта недвижимости.'])}
          // actions={renderActions(
          //   {
          //     actions: productsMap['case-uip'].actions,
          //     innerLink: productsMap['case-uip'].innerLink,
          //     mode: 'page',
          //   }
          // )}
          summaryItems={renderMeta(productsMap['case-uip'].meta)}
          gallery={renderScreens(productsMap['case-uip'].screens)}
          // projectPageUrl={productsMap['case-uip'].projectPageUrl}
          mode="page"
          logo={productsMap['case-uip'].logo}
        />
      </Stack>


      <Stack page="article" width='text' role="subsection">
        <Heading role='section'>
          Кратко
        </Heading>
        <Stack page="article" width='container' role="paragraph">
          <Text role='body'>
            В этом проекте я был ведущим UX UI дизайнером и плотно работал с продуктовым менеджером и программистами. Разработав информационный портал для компании застройщика, мы достигли следующих целей:
          </Text>
        </Stack>
        <Stack page="article" width='container' role="paragraph">
          <List role='body'>
            <ListItem>Формирование доверия к бренду через портфолио, отзывы и профессиональный дизайн</ListItem>
            <ListItem>Привлечение потенциальных клиентов тронулось с места, потому что предыдущие лендинги не вызывали доверия</ListItem>
            <ListItem>Сделали удобный и расширяемый портал для компании</ListItem>
          </List>
        </Stack>
      </Stack>


      <Stack page="article" width='container' role="section">

        <Gallery>
          <Screen src="/projects/uip/page/Hero и о застройщике.png" alt="Hero и о застройщике" addition="Hero и о застройщике" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/ЖК и другие проекты.png" alt="Жилые комплексы и другие проекты" addition="Жилые комплексы и другие проекты" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/Новости и акции.png" alt="Новости и акции" addition="Новости и акции" size='1/3' scroll='parallax' />
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
          <Gallery>
            <Screen src="/projects/uip/page/UIP components.png" alt="Компоненты UIP UI-kit" addition="Компоненты" size='3/3' scroll='static' />
            <Screen src="/projects/uip/page/UIP colors fonts etc.png" alt="Цвета, шрифты UIP UI-kit" addition="Цвета, шрифты, эмблемы, иконки" size='3/3' scroll='static' />
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

        <Stack page="article" width='container' role="subsection">
          <Gallery>
            <Screen src="/projects/uip/page/Модальные окна связи мобильный дизайн.png" alt="Модальное окно в мобильном дизайне" size='1/3' scroll='parallax' />
            <Screen src="/projects/uip/page/Модальные окна связи ПК.png" alt="Модальное окно в ПК дизайне" size='2/3' scroll='parallax' />
          </Gallery>
        </Stack>
      </Stack>


      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Оптимизация под разные устройства (адаптивность)
          </Heading>



          <Stack page="article" width="text" role="subsection">
            <Text role='body'>
              Спроектировали адаптивный дизайна начиная с ширины 320 пикселей, провели тестирование на разных разрешениях экрана, упростили навигации для мобильных пользователей (например, hamburger-меню).
            </Text>
          </Stack>


        </Stack>

        <Stack page="article" width='container' role="subsection">
          <Gallery>
            <Screen src="/projects/uip/page/Адаптивный дизайн.png" alt="Демонстрация экранов под разные устройства" addition="Пример разработки адаптивных экранов для одной из 16 страниц " size='3/3' scroll='static' />
          </Gallery>
        </Stack>
      </Stack>



      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Демонстрация локальных особенностей
          </Heading>



          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Проблема
            </Heading>

            <Stack page="article" width="text" role="paragraph">
              <Text role='body'>
                Федеральные застройщики (ПИК, М2.ру) предлагают унифицированный контент, который не учитывает специфику конкретного региона. Для покупателя из Владивостока важно не абстрактное «развитая инфраструктура», а конкретное: «5 минут до остановки автобуса №31» или «в 300 метрах школа №42».
              </Text>
            </Stack>
            <Text role='body'>
              При анализе конкурентов выяснилось, что региональные игроки (Талан) имеют «менее интерактивные карты без детальных слоёв», теряя возможность показать реальную ценность локации.
            </Text>
          </Stack>


          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Инсайт
            </Heading>
            <Stack page="article" width="text" role="paragraph">
              <Text role='body'>
                Для покупателей Дальнего Востока локация — это не просто точка на карте. Это ответы на вопросы:
              </Text>
            </Stack>


            <Stack page="article" width="text" role="none">
              <List>
                <ListItem>
                  «Как далеко мне добираться по зиме -30° до школы с ребёнком?»
                </ListItem>
                <ListItem>
                  «Есть ли рядом китайский, японский и корейский рестораны?»
                </ListItem>
                <ListItem>
                  «Ходит ли отсюда маршрутка до центра?»
                </ListItem>
              </List>
            </Stack>
          </Stack>


          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Контекстные преимущества:
            </Heading>

            <Stack page="article" width="text" role="none">
              <List>
                <ListItem>
                  <strong>Для семей:</strong> акцент на школах, площадках, безопасности двора
                </ListItem>
                <ListItem>
                  <strong>Для пожилых:</strong> близость к поликлиникам и паркам
                </ListItem>
                <ListItem>
                  <strong>Для предпринимателей:</strong> трафик района, парковка, видимость
                </ListItem>
              </List>
            </Stack>
          </Stack>


        </Stack>

        <Stack page="article" width='container' role="subsection">
          <Gallery>
            <Screen src="/projects/uip/page/Map.png" alt="Демонстрация экранов под разные устройства" addition="Пример отображения карты" size='3/3' scroll='parallax' />
          </Gallery>
        </Stack>
      </Stack>








      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Юзабилити-тестирование
          </Heading>



          <Stack page="article" width="text" role="subsubsection">
            <Heading role="subsection">
              Проблема
            </Heading>

            <Stack page="article" width="text" role="paragraph">
              <Text role='body'>
                <strong>Условия:</strong> ограниченный бюджет заказчика
              </Text>
              <Text role='body'>
                <strong>Участники</strong>: 8 человек из дочерних компаний и 5 человек из нашей компании
              </Text>
              <Text role='body'>
                <strong>Формат:</strong> Немодерируемое удалённое тестирование + интервью
              </Text>
              <Text role='body'>
                <strong>Инструменты:</strong> Figma прототип
              </Text>
            </Stack>
          </Stack>


          <Stack page="article" width="text" role="subsection">
            <Heading role="subsection">
              Ключевые находки и решения
            </Heading>

            <Stack page="article" width="text" role="none">

              {/* 1. Проблема с каталогом */}
              <StatusItem
                status="alert"
                text="5 из 8 путались в каталоге"
                note="Переделали механизм работы хлебных крошек"
              />

              {/* 2. Проблема со сроком сдачи */}
              <StatusItem
                status="alert"
                text="7/8 первым делом искали «когда дом сдаётся» — информация была внизу страницы"
                note="Вынести срок сдачи в карточку превью и в шапку страницы ЖК"
              />

              {/* 3. Проблема с планировкой */}
              <StatusItem
                status="alert"
                text="8/8 не могли разглядеть детали планировки"
                note="Добавили возможность открыть на весь экран"
              />

              {/* 4. Проблема с шрифтом */}
              <StatusItem
                status="alert"
                text="Пожилые участники щурились при чтении характеристик"
                note="Установили базовый размер шрифта от 16px минимум"
              />

              {/* 5. Успех: Фильтр */}
              <StatusItem
                status="success"
                text="8/8 легко нашли фильтр по цене"
              />

              {/* 6. Успех: Контакты */}
              <StatusItem
                status="success"
                text="8/8 легко нашли контакты"
              />

              {/* 7. Успех: Дизайн */}
              <StatusItem
                status="success"
                text="7/8 положительно оценили дизайн страницы ЖК"
              />

            </Stack>
          </Stack>
        </Stack>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <Gallery>
          <Screen src="/projects/uip/page/4212.png" alt="Было" size='1/3' addition={<Heading role='article'>Было</Heading>} scroll='parallax' />
          <Screen src="/projects/uip/uip-full-pc-first-page.png" alt="Стало" size='1/3' addition={<Heading role='article'>Стало</Heading>} scroll='parallax' />
        </Gallery>
      </Stack>


      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Результаты
          </Heading>



          <Stack page="article" width="text" role="subsection">
            <Text role='body'>
              Клиент заказал сайт в имиджевых целях, а основные продажи осуществлялись через размещение рекламы на досках объявлений. После улучшения сайта он отметил значительный рост продаж.
            </Text>
          </Stack>



          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Звонки с сайта
              </Heading>
            </Stack>
            <Heading role='result-value'>
              +30%
            </Heading>
          </Stack>

          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Продолжительность разговора с менеджером уменьшилась
              </Heading>
            </Stack>
            <Heading role='result-value'>
              -76%
            </Heading>
          </Stack>

          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Скорость разработки страниц новых ЖК увеличена благодаре унифицированному UI Kit и продуманной структуре с 4 человекочасов...
              </Heading>
            </Stack>
            <Heading role='result-value'>
              до 20 минут
            </Heading>
          </Stack>
          {/* <Stack page="article" width="text" role="subsection">
            <Stack page="article" width="text" role="none">
              <Heading role="result-heading">Клиент</Heading>
              <Heading role="result-value">Продолжает сотрудничество</Heading>
            </Stack>
          </Stack> */}
        </Stack>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <Screen src="/projects/uip/UIP Mockup.png" alt="UIP Mockup" size='unset' scroll='static' />
      </Stack>

    </>);
}
