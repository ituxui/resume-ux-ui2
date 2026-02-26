import { ProductCard } from "@pages/Landing/sections";
import { renderDescription, renderMeta, renderScreens } from "@pages/Landing/sections/ProductsSection/ProductsSection.utils";
import { tsdPersons } from "@shared/data";
import { productsSection } from "@shared/data/ProductsSection.data";
import { Heading, Text } from "@shared/ui";
import { List, ListItem, Nowrap, Persons, Screen } from "@shared/ui/components";
import { Gallery, Stack } from "@shared/ui/wrappers";


export function TsdProductPage() {
  return <>
    <Stack page="article" width='container' role="subsection">

      <ProductCard
        companyName={"Завод по заправке газов (NDA)"}
        projectName={"Терминал сбора данных"}
        description={renderDescription(['UX для тяжелой промышленности: Как редизайн приложения для ТСД ускорил работу завода на 200%. Это не типичный проект про «красивые кнопки». Это хардкорный промышленный UX.', 'Передо мной стояла задача спроектировать интерфейс для терминала сбора данных (ТСД), который автоматизирует весь цикл жизни баллона: от приемки и проверки качества до заправки и выдачи клиенту.', 'Нужно не просто оцифровать бумажную волокиту, а полностью переосмыслить логистику предприятия. Сотрудники работают в тяжелых условиях, и интерфейс должен стать их помощником, а не препятствием.', 'Уже на первых встречах стало понятно — просто «оцифровать» хаос недостаточно. Нужно было переосмыслить саму логику работы завода.'])}
        // actions={renderActions(
        //   {
        //     actions: productsSection[1].actions,
        //     innerLink: productsSection[1].innerLink,
        //     mode: 'page',
        //   }
        // )}
        summaryItems={renderMeta(productsSection[1].meta)}
        gallery={renderScreens(productsSection[1].screens)}
        // projectPageUrl={productsSection[0].projectPageUrl}
        mode="page"
        logo={productsSection[1].logo}
      />
    </Stack>


    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        Понять реальных пользователей
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Команда продуктовых менеджеров и директоров проводили много времени в цеху. Кабинетное исследование здесь не работало — нужно было видеть грязь, слышать шум и чувствовать усталость.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Провели серию глубинных интервью с работниками цехов, менеджерами, директором и бухгалтерией. Посещали рабочие места, наблюдал за сменами, фиксировал боли и паттерны поведения.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Ключевые инсайты из полевых исследований:
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <List role='body'>
          <ListItem>🏭 <strong>Экстремальные условия:</strong> тёмные цеха, производственный шум, работа в перчатках с одной занятой рукой</ListItem>
          <ListItem>👁️ <strong>Нагрузка на зрение:</strong> постоянная работа в темноте с мелкими маркировками и метками</ListItem>
          <ListItem>⚡ <strong>Потребность в мгновенном фидбэке:</strong> сотрудники не могут постоянно смотреть на экран — руки заняты баллонами</ListItem>
          <ListItem>😓 <strong>Усталость к концу смены:</strong> падает концентрация, растёт вероятность ошибок</ListItem>
        </List>
      </Stack>
    </Stack>

    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        User Personas
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Команда компании провела серию глубинных интервью и полевых наблюдений (shadowing) непосредственно на заводе. Мы общались не только с топ-менеджментом, но и с линейными сотрудниками цеха.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <List role='body'>
          <ListItem><strong>Наблюдение:</strong> Изучили реальные сценарии работы, освещение, уровень шума и эргономику рабочих мест.</ListItem>
          <ListItem><strong>Интервью:</strong> Выявили скрытые фрустрации, о которых не пишут в ТЗ (усталость глаз, страх нажать «не туда»).</ListItem>
        </List>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          На основе собранных данных мы составили портрет ключевого пользователя, на потребности которого опирались при разработке каждого экрана.
        </Text>
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="section">
      <Persons persons={tsdPersons} />
    </Stack>



    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        🕵️ Конкурентный анализ: работа в условиях ограничений
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Прямые конкуренты не раскрывают свои интерфейсы, так как они закрыты от общего доступа. Пришлось действовать креативно: анализировать видео-демонстрации конкурентов на видео-хостингах, изучать кейсы особенности проектировки интерфейсов для различных терминалов из прямых и смежных отраслей, например, изучал особенности проектировки интерфейсов медицинских аппаратов.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Полученные выводы:
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <List role='body'>
          <ListItem>Конкуренты используют RFID-метки. После согласования с заказчиком решили применить их в бизнес-процессе.</ListItem>
          <ListItem>Получены данные о способах крепления RFID-меток к баллонам.</ListItem>
          <ListItem>Получена часть информации об интерфейсах и пользовательских путях.</ListItem>
        </List>
      </Stack>
    </Stack>




    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        💡 Ключевой инсайт: не интерфейс, а трансформация
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Во время исследования стало очевидно: проблема не в отсутствии приложения. Проблема — в самой модели работы.
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          <strong>Было:</strong> Клиент привозит баллоны → оплачивает в кассе → ждёт обработки баллонов → забирает через время
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          <strong>Стало:</strong> Клиент привозит баллоны → оплачивает в кассе → мгновенно получает готовые из обменного фонда
        </Text>
      </Stack>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Это потребовало полного перепроектирования логистики завода совместно с заказчиком:
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem>Система временного хранения готовых баллонов</ListItem>
          <ListItem>Мгновенная привязка баллонов к контрагентам через RFID</ListItem>
          <ListItem>Автоматизация межцеховой передачи и учёта</ListItem>
        </List>
      </Stack>


    </Stack>


    <Stack page="article" width='container' role="section">
      <Heading role='section'>
        Согласовывали с командой и заказчиком <Nowrap>новые бизнес-процессы</Nowrap> предприятия
      </Heading>
      <Gallery>
        <Screen src="/projects/oxygen-plant/page/Схема на коленке.PNG" alt="Схема на коленке" addition='Базовая схема на коленке' size='1/3' scroll='parallax' />
        <Screen src="/projects/oxygen-plant/page/Схема работы завода.png" alt="Схема работы завода" addition='1/4 часть схемы работы завода' size='2/3' scroll='parallax' />
      </Gallery>
    </Stack>




    <Stack page="article" width='container' role="section">

      <Heading role='section'>
        🛠️ Дизайн-решения под экстремальные условия
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Разработал систему компонентов под специфику оборудования и контекста:
        </Text>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Плиточная навигация</strong> — большие кнопки с иконками, понятные без текста</ListItem>
          <ListItem><strong>Мультимодальный фидбэк</strong> — каждое действие подтверждается визуально, звуком и вибрацией</ListItem>
          <ListItem><strong>Защита данных</strong> — невозможно случайно выйти и потерять введённую информацию</ListItem>
          <ListItem><strong>Умные ограничения</strong> — блокировка дублирующих сканирований, валидация на лету</ListItem>
        </List>
      </Stack>


      <Heading role='section'>
        🎨 Дизайн-решения и UI
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Интерфейс спроектирован по принципу «Function First».
        </Text>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Dark Mode по умолчанию:</strong> Экономит батарею ТСД и не слепит глаза в темном цеху</ListItem>
          <ListItem><strong>Гигантизм элементов:</strong> Кнопки и карточки сделаны огромными, чтобы по ним было удобно попадать большим пальцем в перчатке</ListItem>
          <ListItem><strong>Агрессивная обратная связь:</strong> Поскольку в цеху шумно, приложение использует комбинацию звука, вибрации и цветовой индикации (зеленый/красный экран) для подтверждения действий</ListItem>
          <ListItem><strong>Защита данных:</strong> Блокировка кнопки «Назад» во время ввода данных и модальные окна предотвращают случайный сброс прогресса</ListItem>
        </List>
      </Stack>

      <Stack page="article" width='container' role="none">
        <Gallery>
          <Screen src="/projects/oxygen-plant/page/Островки экранов2.png" alt="Островки экранов" addition='Островки экранов' size='3/3' scroll='static' />
        </Gallery>
      </Stack>
    </Stack>



    <Stack page="article" width='container' role="section">

      <Heading role='section'>
        🤝 Developer Hand-off
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Я понимаю, что разработчикам сложно верстать логику без контекста. Поэтому я сделал макеты максимально Programmer-friendly:
        </Text>


      </Stack>


      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Визуальный флоу:</strong> Все экраны соединены стрелками в Figma (как в FigJam), показывающими логику переходов</ListItem>
          <ListItem><strong>Группировка:</strong> Четкое разделение на сценарии (Приемка, Выдача, Инвентаризация)</ListItem>
          <ListItem><strong>Обработка ошибок:</strong> Отрисованы все пограничные состояния (нет связи, ошибка RFID, дубль метки), чтобы разработчику не пришлось их выдумывать</ListItem>
          <ListItem><strong>Защита данных:</strong> Блокировка кнопки «Назад» во время ввода данных и модальные окна предотвращают случайный сброс прогресса</ListItem>
        </List>
      </Stack>

      <Stack page="article" width='container' role="none">
        <Gallery>
          <Screen src="/projects/oxygen-plant/page/Снимки экранов.png" alt="Снимки экранов" addition='Снимки экранов' size='3/3' scroll='static' />
        </Gallery>
      </Stack>
    </Stack>



    <Stack page="article" width='container' role="section">

      <Heading role='section'>
        ⚠️ Error Prevention: отдельный фокус
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Спроектировал комплексную систему предотвращения и обработки ошибок:
        </Text>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Превентивные меры:</strong> блокировка некорректных действий до их совершения</ListItem>
          <ListItem><strong>Понятные сообщения:</strong> не просто «Ошибка», а что случилось и что делать</ListItem>
          <ListItem><strong>Защита от потери данных:</strong> модальные окна при попытке выйти</ListItem>
          <ListItem><strong>Graceful degradation:</strong> лоадеры и фидбэк при задержках системы</ListItem>
        </List>
      </Stack>



      <Stack page="article" width='container' role="none">
        <Gallery><Screen
          src="/projects/oxygen-plant/errors/1.2. Sign In Credentials Error.png"
          alt="Ошибка входа по учетным данным"
          addition="Ошибка входа по учетным данным"
          size="1/3"
          scroll="static"
        />

          <Screen
            src="/projects/oxygen-plant/errors/2.1 Sign In Pin Code Errors.png"
            alt="Ошибка ввода PIN-кода"
            addition="Ошибка ввода PIN-кода"
            size="1/3"
            scroll="static"
          />

          <Screen
            src="/projects/oxygen-plant/errors/6.2.1 Existed Cylinder And NFC.png"
            alt="Существующий баллон и NFC-сканирование"
            addition="Существующий баллон и NFC-сканирование"
            size="1/3"
            scroll="static"
          />

          <Screen
            src="/projects/oxygen-plant/errors/6.2.2.1. Existed Cylinder And NFC Abort.png"
            alt="Отмена операции с существующим баллоном и NFC"
            addition="Отмена операции с существующим баллоном и NFC"
            size="1/3"
            scroll="static"
          />

          <Screen
            src="/projects/oxygen-plant/errors/8.1.3 Cylinder remove acceptance.png"
            alt="Подтверждение удаления баллона"
            addition="Подтверждение удаления баллона"
            size="1/3"
            scroll="static"
          />

          <Screen
            src="/projects/oxygen-plant/errors/9. Alert.png"
            alt="Глобальное уведомление (алерт)"
            addition="Предупреждение о необходимости пройти ТО"
            size="1/3"
            scroll="static"
          />
        </Gallery>
      </Stack>
    </Stack>


    <Stack page="article" width='container' role="section">

      <Heading role='section'>
        📱 Пример 1 из 10 популярных User Flow: Приёмка баллонов
      </Heading>


      <Stack page="article" width='container' role="subsection">
        <List role='body'>
          <ListItem><strong>Выбор контрагента</strong> — по ИНН, ФИО, телефону, RFID или из недавних</ListItem>
          <ListItem><strong>Подтверждение данных</strong></ListItem>
          <ListItem><strong>Сканирование баллонов</strong> — поддержка новых, повреждённых и без метки</ListItem>
          <ListItem><strong>Ручной ввод</strong> при необходимости</ListItem>
          <ListItem><strong>Выбор действий</strong> — ремонт, ТО, списание, заправка</ListItem>
          <ListItem><strong>Расчёт стоимости</strong></ListItem>
          <ListItem><strong>Подтверждение заявки</strong></ListItem>
        </List>
      </Stack>

      <Stack page="article" width='container' role="none">
        <Gallery>
          <Screen src="/projects/oxygen-plant/page/3. Приёмка.png" alt="Приёмка" addition='Приёмка' size='3/3' scroll='static' />
        </Gallery>
      </Stack>
    </Stack>


    <Stack page="article" width='container' role="section">

      <Heading role='section'>
        🧠 Мои takeaways
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Что я вынес из этого проекта:
        </Text>
      </Stack>


      <Stack page="article" width='container' role="section">
        <List role='body'>
          <ListItem>Проектирование для специализированных устройств — отдельная дисциплина</ListItem>
          <ListItem>Полевые исследования в реальных условиях дают инсайты, которые не получить в офисе</ListItem>
          <ListItem>Иногда лучшее UX-решение — это изменение бизнес-процесса, а не интерфейса</ListItem>
          <ListItem>Тёмная тема, крупные элементы и звуковой фидбэк — не «nice to have», а критичные паттерны для промышленного UX</ListItem>
          <ListItem>Error prevention важнее красивой обработки ошибок</ListItem>
        </List>
      </Stack>
    </Stack>






    <Stack page="article" width='text' role="section">

      <Stack page="article" width='container' role="section">
        <Heading role='hero'>
          Результаты
        </Heading>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Stack page="article" width='container' role="paragraph">
          <Heading role='result-heading'>
            Скорость обслуживания клиентов
          </Heading>
        </Stack>
        <Heading role='result-value'>
          +200%
        </Heading>
      </Stack>



      <Stack page="article" width='container' role="subsection">
        <Stack page="article" width='container' role="paragraph">
          <Heading role='result-heading'>
            Ошибок
          </Heading>
        </Stack>
        <Heading role='result-value'>
          -80%
        </Heading>
      </Stack>



      <Stack page="article" width='container' role="subsection">
        <Stack page="article" width='container' role="paragraph">
          <Heading role='result-heading'>
            У сотрудников снижен стресс
          </Heading>
        </Stack>
        <Heading role='result-value'>
          Повышен Employee Net Promoter Score
        </Heading>
      </Stack>

    </Stack>
  </>;
}
