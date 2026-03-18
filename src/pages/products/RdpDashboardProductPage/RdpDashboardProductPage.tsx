import { ProductCard } from "@pages/Landing/sections";
import { renderDescription, renderMeta, renderScreens } from "@pages/Landing/sections/ProductsSection/ProductsSection.utils";
import { rdpDashboardCompetitorsData, rdpPersons, } from "@shared/data";
import { productsSection } from "@shared/data/ProductsSection.data";
import { Heading, Link, Text } from "@shared/ui";
import { CompetitorsTable, List, ListItem, Persons, Screen } from "@shared/ui/components";
import { Stack } from "@shared/ui/wrappers";

export function RdpDashboardProductPage() {
  return <>

    <Stack page="article" width='container' role="subsection">

      <ProductCard
        companyName={"Stellar"}
        projectName={"Сервис удалённого доступа через RDP"}
        description={renderDescription(['Enterprise-решение для безопасного управления удалённым доступом через Remote Desktop Protocol. Я осуществил полный редизайн панели управления для сервиса безопасного удаленного доступа (RDP) и превратил «сырой» внутренний инструмента в конкурентоспособный продукт для выхода на внешний рынок.'])}
        // actions={renderActions(
        //   {
        //     actions: productsMap['case-tsd'].actions,
        //     innerLink: productsMap['case-tsd'].innerLink,
        //     mode: 'page',
        //   }
        // )}
        summaryItems={renderMeta(productsSection[3].meta)}
        gallery={renderScreens(productsSection[3].screens)}
        // projectPageUrl={productsMap['case-uip'].projectPageUrl}
        mode="page"
        logo={productsSection[3].logo}
      />
    </Stack>




    <Stack page="article" width="full" role="section">
      <Heading role="section">
        Контекст и вызов
      </Heading>



      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Исходная ситуация
        </Heading>

        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Комплексный редизайн дашборд-системы, для существующего enterprise-продукта, используемого внутри компании. В ходе проекта необходимо полностью переработаны пользовательские пути, информационную архитектуру и ключевые бизнес-процессы.
          </Text>
        </Stack>
      </Stack>


      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Ключевая проблема
        </Heading>
        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Предыдущая версия интерфейса не удовлетворяла потребностям целевой аудитории (системные администраторы, DevOps-инженеры, менеджеры по безопасности), поскольку была разработана без участия UX-специалистов в режиме rapid prototyping с использованием AI-генерации, что привело к критическим проблемам usability и низкому task completion rate.
          </Text>
        </Stack>
      </Stack>


      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Бизнес-цели
        </Heading>

        <Stack page="article" width="text" role="none">
          <List>
            <ListItem>
              Подготовить продукт к выходу на B2B и B2C рынки, обеспечив конкурентоспособный UX.
            </ListItem>
            <ListItem>
              Снизить время получения выгоды (time-to-value) для новых пользователей
            </ListItem>
            <ListItem>
              Уменьшить нагрузку на техническую поддержку
            </ListItem>
            <ListItem>
              Обеспечить масштабируемость интерфейса под будущий функционал
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>







    <Stack page="article" width="full" role="section">
      <Heading role="section">
        Исследовательская фаза
      </Heading>



      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Исследование пользователей и контекста
        </Heading>

        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Провёл серию глубинных интервью с пользователями текущего продукта, включая супер-администраторов и системных администраторов. Применил методологию Jobs-to-be-Done для анализа потребностей и контекста использования, собрал качественную обратную связь о pain points существующего решения.
          </Text>
        </Stack>
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        User Personas
      </Heading>
      <Stack page="article" width='container' role="subsection">
        <Text role='body'>
          На основе глубинных интервью сформировал 5 ключевых персон
        </Text>
      </Stack>
      <Stack page="article" width='text' role="section">
        <Persons persons={rdpPersons} />
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="section">
      <Heading role='section'>
        Выводы из анализа персон
      </Heading>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Полярность аудитории
        </Heading>
        <Text role='body'>
          Мы обнаружили фундаментальный разрыв: «Пассажирам» (Анна, Алексей) нужен интерфейс однокнопочного лифта, а «Архитекторам» (Павел, Виктор) — приборная панель боинга. Одно решение не подойдет всем. Мы внедрили <strong>адаптивность по ролям</strong>: интерфейс кардинально меняется в зависимости от прав доступа, скрывая сложность от новичков.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Zero-Config для конечных пользователей
        </Heading>
        <Text role='body'>
          Для персон типа Анны и Алексея любой экран настроек — это стресс. Мы реализовали концепцию <strong>«Инвайт → Работа»</strong>. Пользователь получает ссылку, задает пароль и сразу попадает к своим рабочим столам. Никаких портов, хостов и инсталляций.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Эффективность для Супер-админов
        </Heading>
        <Text role='body'>
          Павел управляет сотнями людей и ненавидит лишние клики. Для него мы разработали режим <strong>высокой плотности данных</strong> (Compact Mode), поддержку горячих клавиш (Keyboard-first) и, главное, <strong>массовые операции</strong> (Bulk Actions), позволяющие менять права для 50 пользователей в два клика.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Ситуативная осведомленность (Security)
        </Heading>
        <Text role='body'>
          Виктору (SecOps) недостаточно просто логов, ему нужен контекст. Мы спроектировали <strong>Real-time дашборд</strong> с живой картой сессий и умными алертами. Вложенные логи (Drill-down) позволяют расследовать инциденты без бесконечного перехода по страницам.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Профессиональные требования
        </Heading>
        <Text role='body'>
          Для специалистов вроде Дмитрия (1С) критична не только простота, но и функциональность. Мы обеспечили бесшовный <strong>проброс оборудования</strong> (принтеры, сканеры) и список «Недавних подключений» для мгновенного переключения между контекстами разных клиентов.
        </Text>
      </Stack>

      <Stack page="article" width='container' role="subsection">
        <Heading role='subsection'>
          Гуманизация ошибок
        </Heading>
        <Text role='body'>
          Технические коды ошибок пугают менеджеров и заставляют их писать в поддержку. Мы переписали все системные сообщения на <strong>человеческий язык</strong> («Компьютер выключен» вместо «Error 0x800»), снабдив их четкими инструкциями к действию.
        </Text>
      </Stack>
    </Stack>





    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        Конкурентный анализ
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          Провёл комплексный competitive analysis 12 решений на рынке RDP-сервисов
        </Text>
      </Stack>
    </Stack>

    <Stack page="article" width='container' role="section">
      <CompetitorsTable data={rdpDashboardCompetitorsData} />
    </Stack>

    <Heading role='section'>
      Выводы из анализа конкурентов
    </Heading>

    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Два интерфейса в одном — разделение по ролям
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Text role='body'>
        <strong>Проблема рынка:</strong> Все конкуренты предлагают единый интерфейс для всех. Рядовой сотрудник видит логи и политики, а CTO вынужден продираться через упрощённые виджеты.
      </Text>
      <Text role='body'>
        <strong>Решение:</strong> Спроектировать <strong>ролевые представления</strong> — минималистичный «режим пользователя» (только список рабочих столов и кнопка «Подключиться») и «режим администратора» (таблицы, логи, массовые операции, политики). Один продукт — два UX-слоя.
      </Text>
    </Stack>

    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Браузерный доступ — конкурентное преимущество
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Text role='body'>
        <strong>Проблема рынка:</strong> 7 из 10 конкурентов требуют установки клиентского приложения. Только Cloudflare, 2GC и «Ваш ИТ офис» предлагают веб-доступ — и именно они выигрывают у рядовых сотрудников, которые не хотят ничего устанавливать.
      </Text>
      <Text role='body'>
        <strong>Решение:</strong> Реализовать <strong>подключение через браузер</strong> как основной сценарий для рядовых пользователей, а нативный клиент — как опцию для продвинутых, которым важна скорость отклика.
      </Text>
    </Stack>

    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Drawer вместо перехода — сохранение контекста
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Text role='body'>
        <strong>Проблема рынка:</strong> У конкурентов с табличным интерфейсом (RuDesktop, Devolutions, RManSys) при клике на сущность происходит переход на новую страницу. Администратор теряет контекст, фильтры сбрасываются.
      </Text>
      <Text role='body'>
        <strong>Решение:</strong> При клике на строку таблицы открывать <strong>боковую панель (drawer)</strong> с деталями, не покидая текущий список. Это сохраняет контекст, позволяет быстро просматривать сущности одну за другой и радикально снижает количество кликов.
      </Text>
    </Stack>


    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Логи — это продукт, а не свалка
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Stack page="article" width='full' role="paragraph">
        <Text role='body'>
          <strong>Проблема рынка:</strong> У большинства конкурентов логи представлены как сырой поток событий без категоризации. Безопасник тратит часы на расследование вместо минут.
        </Text>
        <Text role='body'>
          <strong>Решение:</strong> Разделить логи на <strong>категории с отдельными вкладками</strong> (авторизация, сессии, политики, системные). Добавить вложенные логи, раскрывающиеся прямо в строке таблицы. Поиск и фильтрация по дате, пользователю, хосту и типу события — обязательны.
        </Text>
      </Stack>
      <Stack page="article" width='full' role="paragraph">
        <Screen src="/projects/rdp/Секция Логи.png" size="3/3" alt="Отсутствие эффективного поиска и фильтрации" scroll='static' />
      </Stack>
    </Stack>

    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Информационная плотность решает
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Text role='body'>
        <strong>Проблема рынка:</strong> Enterprise-продукты страдают от «воздуха» — большие отступы, карточки вместо строк, анимации. CTO, управляющий 300 пользователями, не может эффективно работать в таком UI.
      </Text>
      <Text role='body'>
        <strong>Решение:</strong> Использовать <strong><Link href="https://carbondesignsystem.com/" accent="high" phrase="Carbon Design System" /></strong> с компактным режимом таблиц. Это даёт максимум строк на экране, снижает скроллинг и ускоряет сканирование информации — именно то, чего ждут power users.
      </Text>
    </Stack>

    <Stack page="article" width='text' role="none">
      <Heading role='subsection'>
        Панель управления
      </Heading>
    </Stack>
    <Stack page="article" width='container' role="subsection">
      <Text role='body'>
        Вместо разрозненных подключений мы создали <strong>единый дашборд</strong>. Внедрили карточную систему с группировкой по отделам и мгновенными <strong>индикаторами статуса</strong> (Online/Offline), чтобы админ считывал ситуацию за секунду.
      </Text>
    </Stack>




  </>;
}


// <Stack page="article" width='text' role="subsubsection">

//   <Heading role='subsection'>
//     Два интерфейса в одном — разделение по ролям
//   </Heading>
//   <Stack page="article" width='container' role="none">
//     <Stack page="article" width='container' role="paragraph">
//       <Text role='body'>
//         Отсутствие эффективного поиска и фильтрации
//       </Text>
//     </Stack>
//     <Stack page="article" width='container' role="paragraph">
//       <Text role='body'>
//         <strong>Проблема:</strong> Пользователи испытывали затруднения при поиске и фильтрации сущностей, что увеличивало время выполнения задач и усложняло навигацию.
//       </Text>
//     </Stack>
//     <Stack page="article" width='container' role="paragraph">
//       <Text role='body'>
//         <strong>Решение:</strong> Реализован глобальный поиск с нечётким соответствием и контекстно-зависимая фасетная фильтрация для каждого типа сущностей.
//       </Text>
//     </Stack>
//   </Stack>

//   {/* TODO: Картинку вставить. Также можно вставлять до и после здесь или глобально */}
// </Stack>
// <Stack page="article" width='full' role="paragraph">
//   <Screen src="/projects/rdp/Отсутствие эффективного поиска и фильтрации.png" size="3/3" alt="Отсутствие эффективного поиска и фильтрации" scroll='static' />
// </Stack>


// <Stack page="article" width='text' role="none">
//   <Heading role='subsection'>
//     Zero Trust — не только технология, но и маркетинговая рамка
//   </Heading>
// </Stack>
// <Stack page="article" width='container' role="subsection">
//   <Text role='body'>
//     <strong>Проблема рынка:</strong> Только TruGrid, 2GC и Cloudflare явно заявляют Zero Trust. Российские конкуренты эту тему игнорируют, хотя их целевая аудитория — безопасники, для которых это ключевой критерий выбора.
//   </Text>
//   <Text role='body'>
//     <strong>Решение:</strong> Даже если полный Zero Trust не реализован на MVP, важно проектировать UI с <strong>«мышлением безопасности»</strong>: визуально показывать статус верификации устройства, геолокацию входа, MFA-статус — это формирует доверие на уровне интерфейса.
//   </Text>
// </Stack>


// <Stack page="article" width='text' role="none">
//   <Heading role='subsection'>
//     Стратегия Simplicity First
//   </Heading>
// </Stack>
// <Stack page="article" width='container' role="subsection">
//   <Text role='body'>
//     Анализ показал, что рынок перенасыщен сложными Enterprise-решениями. Пользователи хотят просто «зайти на рабочий ПК». Я выбрал стратегию <strong>Simplicity First</strong>: убрал техническую шелуху (порты, IP), визуализировал подключения и перенес весь опыт в браузер.
//   </Text>
// </Stack>
