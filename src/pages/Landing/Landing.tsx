import { AboutMeSection, ArticlesSection, Hero, LetsTalkSection, ProductsSection } from './sections';
import styles from './Landing.module.scss';


export function LandingPage() {
  return <div className={styles.wrapper}>
    <Hero />
    <ProductsSection />
    <AboutMeSection />
    <ArticlesSection />
    <LetsTalkSection />
  </div>;
}





{/* <ProductCard
      companyName="УИП"
      projectName="Многостраничный портал застройщика"
      description={
        <>
          Участвовал во всех ключевых этапах: от бенчмаркинга конкурентов до проектирования пользовательских сценариев, разработки интерактивных прототипов и проведения тестирования на реальных пользователях. Обеспечил удобную навигацию, реализовал фильтры поиска, страницы объектов и новостные разделы, сфокусировавшись на оптимизации пользовательского опыта для разных сегментов аудитории (например, пожилых людей, инвесторов, предпринимателей).
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap.uip} face='solid'>Процесс разработки</Button>,
        <Button accent='primary' href="https://uipdv.ru" face='light'>Сервис</Button>,
        <Button accent='primary' href="https://наш.дом.рф/сервисы/единый-реестр-застройщиков/застройщик/976" face='light'>Организация</Button>,
        // <Button key="prototype" href="#">Прототип</Button>,
        // <Button key="case" href="#">Кейс</Button>
      ]}
      summaryItems={[
        <Meta title="Даты" children="2023&nbsp;—&nbsp;2024" />,
        <Meta title="Роль" children="UX UI Head" />,
        <Meta title="Сфера" children="Enterprise SaaS, Project Management, ConTech, PropTech" />,
        <Meta title="Организация" children={<Link href="https://наш.дом.рф/сервисы/единый-реестр-застройщиков/застройщик/976" size="sm" phrase='ООО «СЗ-Управление Инвестиционных Программ»' />} />,
        <Meta title="Платформа" children="Web" />,
        <Meta title="Доступ" children={<Link href="https://uipdv.ru" size="sm" phrase='Открытый' />} />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/uip/uip-full-mobile-first-page.png" size="1/3" alt="УИП" scroll='parallax' />
        <Screen mode='default' src="/projects/uip/uip-full-pc-first-page.png" size="2/3" alt="УИП" scroll='parallax' />
      </>

      }
    />

    <ProductCard
      companyName="Кислородный завод (NDA)"
      projectName="Терминал сбора данных"
      description={
        <>
          Провел глубокий анализ потребностей пользователей и бизнес-процессов, разработал интуитивный интерфейс для терминала Chainway C5 UHF, адаптированный под сложные производственные условия, с крупными элементами, темной темой и четкой обратной связью. Cпроектировал макеты, оптимизированные для разработчиков, с ясной структурой и визуальными инструкциями, обеспечив их легкую реализацию. В результате приложение увеличило скорость обслуживания, сократило ошибки и улучшило межцеховое взаимодействие, полностью трансформировав работу завода.
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap.tsd} face='solid'>Процесс разработки</Button>,
        // <Button key="prototype" href="#">Прототип</Button>,
        // <Button key="case" href="#">Кейс</Button>
      ]}
      summaryItems={[
        <Meta title="Даты" children="2024" />,
        <Meta title="Роль" children="UX UI Head" />,
        <Meta title="Сфера" children="Industry 4.0, IIoT, Embedded Systems, Industrial Automation" />,
        <Meta title="Организация" children="NDA" />,
        <Meta title="Платформа" children="Android (Chainway C5 UHF)" />,
        <Meta title="Доступ" children="Закрытый" />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/oxygen-plant/landing.jpg" size="2/3" alt="Терминал сбора данных" />
        <Screen mode='full' src="/projects/oxygen-plant/result/на-заводе.jpg" size="1/3" alt="Терминал сбора данных" />
      </>

      }
    />



    <ProductCard
      companyName="ДВИПРАЗ"
      projectName="Многостраничный портал для Института"
      description={
        <>
          Разработка информационного портала для Института дополнительного профессионального образования
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap['dvipraz-landing']} face='solid'>Процесс разработки</Button>,
        <Button accent='primary' href="https://dvipraz.ru/" face='light'>Сервис</Button>,
        <Button accent='primary' href="https://www.rusprofile.ru/id/9260851" face='light'>Организация</Button>,
      ]}
      summaryItems={[
        <Meta title="Даты" children="2024&nbsp;—&nbsp;2025" />,
        <Meta title="Роль" children="UX UI" />,
        <Meta title="Сфера" children="Media Tech, Content Management" />,
        <Meta title="Организация" children={<Link href="https://www.rusprofile.ru/id/9260851" size="sm" phrase='АНО ДПО "ДВИПРАЗ"' />} />,
        <Meta title="Платформа" children="Web" />,
        <Meta title="Доступ" children={<Link href="https://dvipraz.ru/" size="sm" phrase='Открытый' />} />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/dvipraz/landing-mobile.png" size="1/3" alt="ДВИПРАЗ" scroll='parallax' />
        <Screen mode='default' src="/projects/dvipraz/landing-1280.png" size="2/3" alt="ДВИПРАЗ" scroll='parallax' />
      </>

      }
    />


    <ProductCard
      companyName="ДВИПРАЗ"
      projectName="Система управления организаций"
      description={
        <>
          Разработка основного функционала панели управлений Института дополнительного профессионального образования «ДВИПРАЗ», которая предоставляет собой сервис для организаций по ведению своего штатного расписания, отправления заявок на специальную оценку условий труда, публикацию вакансий и ведению учёта сотрудников и должностей.
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap['dvipraz-dashboard']} face='solid'>Процесс разработки</Button>,
        <Button accent='primary' href="https://lk.dvipraz.ru/" face='light'>Сервис</Button>,
        <Button accent='primary' href="https://www.rusprofile.ru/id/9260851" face='light'>Организация</Button>,
      ]}
      summaryItems={[
        <Meta title="Даты" children="2025&nbsp;—&nbsp;н.в." />,
        <Meta title="Роль" children="UX UI Head" />,
        <Meta title="Сфера" children="B2B SaaS, HR Management" />,
        <Meta title="Организация" children={<Link href="https://www.rusprofile.ru/id/9260851" size="sm" phrase='АНО ДПО "ДВИПРАЗ"' />} />,
        <Meta title="Платформа" children="Web" />,
        <Meta title="Доступ" children={<Link href="https://lk.dvipraz.ru/" size="sm" phrase='Открытый' />} />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/dvipraz-lk/landing.png" size="3/3" alt="ДВИПРАЗ ЛК" />
      </>

      }
    />


    <ProductCard
      companyName="Stellar"
      projectName="Сервис удалённого доступа через RDP-соединение"
      description={
        <>
          Сервис удалённого RDP доступа, которое сочетает в себе мощные инструменты для компаний и простоту для пользователей. Функции логирования, слежения, ограничений и автоматизации контроля позволяют получить полную картину происходящего и обеспечить спокойствие и уверенность в безопасности данных. Проект работает для более чем 30 клиентов компании 4А, став неотъемлемой частью бизнеса, и проходит финальные тестирования. Но Вы можете связаться с 4А, чтобы попросить их протестировать продукт бесплатно, не сообщая кто его Вам посоветовал.
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap['rdp-dashboard']} face='solid'>Процесс разработки</Button>,
        // <Button accent='primary' href="https://lk.dvipraz.ru/" face='light'>Сервис</Button>,
        <Button accent='primary' href="https://www.rusprofile.ru/id/7564381" face='light'>Организация</Button>,
      ]}
      summaryItems={[
        <Meta title="Даты" children="2025&nbsp;—&nbsp;н.в." />,
        <Meta title="Роль" children="UX UI Head" />,
        <Meta title="Сфера" children="Cybersecurity Tech" />,
        <Meta title="Организация" children={<Link href="https://www.rusprofile.ru/id/7564381" size="sm" phrase='ООО «4А»' />} />,
        <Meta title="Платформа" children="Web" />,
        <Meta title="Доступ" children="Закрытое тестирование" />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/rdp/landing.png" size="3/3" alt="Stellar" />
      </>
      }
    />


    <ProductCard
      companyName="Международный авиатерминал"
      projectName="Система учёта пассажиров"
      description={
        <>
          Разрабатывал продукт по собственной инициативе, работая в Аэропорту на должности диспетчера службы информации, не связанной с IT. Мотивацией разрабатывать стало большое количество болей сотрудников бизнес-зала, отсутствие автоматизации процесса работы, задержки на стойке регистрации в бизнес-зале. Я горжусь этим проектом, так как с него началось моё понимание, что я хочу делать приложения, упрощающие бизнес-процессы.
        </>
      }
      actions={[
        <Button accent='primary' to={routeMap.aeroakt} face='solid'>Процесс разработки</Button>,
        // <Button accent='primary' href="https://lk.dvipraz.ru/" face='light'>Сервис</Button>,
        <Button accent='primary' href="https://www.rusprofile.ru/id/11759511" face='light'>Организация</Button>,
      ]}
      summaryItems={[
        <Meta title="Даты" children="2016&nbsp;—&nbsp;2019" />,
        <Meta title="Роль" children="Лид" />,
        <Meta title="Сфера" children="Travel Tech, Transportation" />,
        <Meta title="Организация" children={<Link href="https://www.rusprofile.ru/id/11759511" size="sm" phrase='АО "Международный Авиатерминал Хабаровск"' />} />,
        <Meta title="Платформа" children="Excel" />,
        <Meta title="Доступ" children="Закрытый" />,

      ]}
      gallery={<>
        <Screen mode='default' src="/projects/aeroakt/landing.jpg" size="3/3" alt="Аэроакт" />
      </>
      }
    /> */}
