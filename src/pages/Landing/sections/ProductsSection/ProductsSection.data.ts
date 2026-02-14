import { routeMap } from "@shared/routes";
import type { ProjectData } from "./ProductsSection.types";

export const productsSection: ProjectData[] = [
  {
    id: 'uip',
    projectPageUrl: routeMap.uip,
    companyName: 'УИП',
    projectName: 'Многостраничный портал застройщика',
    logo: '/images/brand/УИП.png',
    description: ['Участвовал во всех ключевых этапах: от бенчмаркинга конкурентов до проектирования пользовательских сценариев, разработки интерактивных прототипов и проведения тестирования на реальных пользователях. Обеспечил удобную навигацию, реализовал фильтры поиска, страницы объектов и новостные разделы, сфокусировавшись на оптимизации пользовательского опыта для разных сегментов аудитории (например, пожилых людей, инвесторов, предпринимателей).'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap.uip },
    actions: [
      { label: 'Сервис', face: 'light', href: 'https://uipdv.ru' },
      { label: 'Организация', face: 'light', href: 'https://наш.дом.рф/сервисы/единый-реестр-застройщиков/застройщик/976' },
    ],
    meta: [
      { title: 'Даты', value: '2023\u00A0—\u00A02024' },
      { title: 'Роль', value: 'UX UI Head' },
      { title: 'Сфера', value: 'Enterprise SaaS, Project Management, ConTech, PropTech' },
      { title: 'Организация', value: '', link: { href: 'https://наш.дом.рф/сервисы/единый-реестр-застройщиков/застройщик/976', phrase: 'ООО «СЗ-Управление Инвестиционных Программ»' } },
      { title: 'Платформа', value: 'Web' },
      { title: 'Доступ', value: '', link: { href: 'https://uipdv.ru', phrase: 'Открытый' } },
    ],
    screens: [
      { src: '/projects/uip/uip-full-mobile-first-page.png', alt: 'УИП', size: '1/3', scroll: 'parallax' },
      { src: '/projects/uip/uip-full-pc-first-page.png', alt: 'УИП', size: '2/3', scroll: 'parallax' },
    ],
  },
  {
    id: 'tsd',
    projectPageUrl: routeMap.tsd,
    companyName: 'Кислородный завод (NDA)',
    projectName: 'Терминал сбора данных',
    logo: '/images/brand/Завод.png',
    description: ['Провел глубокий анализ потребностей пользователей и бизнес-процессов, разработал интуитивный интерфейс для терминала Chainway C5 UHF, адаптированный под сложные производственные условия, с крупными элементами, темной темой и четкой обратной связью. Спроектировал макеты, оптимизированные для разработчиков, с ясной структурой и визуальными инструкциями, обеспечив их легкую реализацию. В результате приложение увеличило скорость обслуживания, сократило ошибки и улучшило межцеховое взаимодействие, полностью трансформировав работу завода.'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap.tsd },
    actions: [
    ],
    meta: [
      { title: 'Даты', value: '2024' },
      { title: 'Роль', value: 'UX UI Head' },
      { title: 'Сфера', value: 'Industry 4.0, IIoT, Embedded Systems, Industrial Automation' },
      { title: 'Организация', value: 'NDA' },
      { title: 'Платформа', value: 'Android (Chainway C5 UHF)' },
      { title: 'Доступ', value: 'Закрытый' },
    ],
    screens: [
      { src: '/projects/oxygen-plant/landing.jpg', alt: 'Терминал сбора данных', size: '2/3', },
      { src: '/projects/oxygen-plant/result/22.png', alt: 'Терминал сбора данных', size: '1/3', },
    ],
  },
  {
    id: 'dvipraz-landing',
    companyName: 'ДВИПРАЗ',
    projectPageUrl: routeMap["dvipraz-landing"],
    logo: '/images/brand/ДВИПРАЗ.png',
    projectName: 'Многостраничный портал для Института',
    description: ['Разработка информационного портала для Института дополнительного профессионального образования'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap['dvipraz-landing'] },
    actions: [
      { label: 'Сервис', face: 'light', href: 'https://dvipraz.ru/' },
      { label: 'Организация', face: 'light', href: 'https://www.rusprofile.ru/id/9260851' },
    ],
    meta: [
      { title: 'Даты', value: '2024\u00A0—\u00A02025' },
      { title: 'Роль', value: 'UX UI' },
      { title: 'Сфера', value: 'Media Tech, Content Management' },
      { title: 'Организация', value: '', link: { href: 'https://www.rusprofile.ru/id/9260851', phrase: 'АНО ДПО "ДВИПРАЗ"' } },
      { title: 'Платформа', value: 'Web' },
      { title: 'Доступ', value: '', link: { href: 'https://dvipraz.ru/', phrase: 'Открытый' } },
    ],
    screens: [
      { src: '/projects/dvipraz/landing-mobile.png', alt: 'ДВИПРАЗ', size: '1/3', scroll: 'parallax' },
      { src: '/projects/dvipraz/landing-1280.png', alt: 'ДВИПРАЗ', size: '2/3', scroll: 'parallax' },
    ],
  },
  {
    id: 'dvipraz-dashboard',
    projectPageUrl: routeMap["dvipraz-dashboard"],
    companyName: 'ДВИПРАЗ',
    logo: '/images/brand/ДВИПРАЗ.png',
    projectName: 'Система управления организаций',
    description: ['Разработка основного функционала панели управлений Института дополнительного профессионального образования «ДВИПРАЗ», которая предоставляет собой сервис для организаций по ведению своего штатного расписания, отправления заявок на специальную оценку условий труда, публикацию вакансий и ведению учёта сотрудников и должностей.'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap['dvipraz-dashboard'] },
    actions: [
      { label: 'Сервис', face: 'light', href: 'https://lk.dvipraz.ru/' },
      { label: 'Организация', face: 'light', href: 'https://www.rusprofile.ru/id/9260851' },
    ],
    meta: [
      { title: 'Даты', value: '2025\u00A0—\u00A0н.в.' },
      { title: 'Роль', value: 'UX UI Head' },
      { title: 'Сфера', value: 'B2B SaaS, HR Management' },
      { title: 'Организация', value: '', link: { href: 'https://www.rusprofile.ru/id/9260851', phrase: 'АНО ДПО "ДВИПРАЗ"' } },
      { title: 'Платформа', value: 'Web' },
      { title: 'Доступ', value: '', link: { href: 'https://lk.dvipraz.ru/', phrase: 'Открытый' } },
    ],
    screens: [
      { src: '/projects/dvipraz-lk/landing.png', alt: 'ДВИПРАЗ ЛК', size: '3/3' },
    ],
  },
  {
    id: 'rdp-dashboard',
    projectPageUrl: routeMap["rdp-dashboard"],
    companyName: 'Stellar',
    logo: '/images/brand/Stellar.png',
    projectName: 'Сервис удалённого доступа через RDP-соединение',
    description: ['Сервис удалённого RDP доступа, которое сочетает в себе мощные инструменты для компаний и простоту для пользователей. Функции логирования, слежения, ограничений и автоматизации контроля позволяют получить полную картину происходящего и обеспечить спокойствие и уверенность в безопасности данных. Проект работает для более чем 30 клиентов компании 4А, став неотъемлемой частью бизнеса, и проходит финальные тестирования. Но Вы можете связаться с 4А, чтобы попросить их протестировать продукт бесплатно, не сообщая кто его Вам посоветовал.'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap['rdp-dashboard'] },
    actions: [
      { label: 'Организация', face: 'light', href: 'https://www.rusprofile.ru/id/7564381' },
    ],
    meta: [
      { title: 'Даты', value: '2025\u00A0—\u00A0н.в.' },
      { title: 'Роль', value: 'UX UI Head' },
      { title: 'Сфера', value: 'Cybersecurity Tech' },
      { title: 'Организация', value: '', link: { href: 'https://www.rusprofile.ru/id/7564381', phrase: 'ООО «4А»' } },
      { title: 'Платформа', value: 'Web' },
      { title: 'Доступ', value: 'Закрытое тестирование' },
    ],
    screens: [
      { src: '/projects/rdp/landing.png', alt: 'Stellar', size: '3/3' },
    ],
  },
  {
    id: 'aeroakt',
    projectPageUrl: routeMap["aeroakt"],
    companyName: 'Международный авиатерминал',
    logo: '/images/brand/Аэроакт.png',
    projectName: 'Система учёта пассажиров',
    description: ['Разрабатывал продукт по собственной инициативе, работая в Аэропорту на должности диспетчера службы информации, не связанной с IT. Мотивацией разрабатывать стало большое количество болей сотрудников бизнес-зала, отсутствие автоматизации процесса работы, задержки на стойке регистрации в бизнес-зале. Я горжусь этим проектом, так как с него началось моё понимание, что я хочу делать приложения, упрощающие бизнес-процессы.'],
    innerLink: { label: 'Процесс разработки', face: 'solid', to: routeMap.aeroakt },
    actions: [
      { label: 'Организация', face: 'light', href: 'https://www.rusprofile.ru/id/11759511' },
    ],
    meta: [
      { title: 'Даты', value: '2016\u00A0—\u00A02019' },
      { title: 'Роль', value: 'Лид' },
      { title: 'Сфера', value: 'Travel Tech, Transportation' },
      { title: 'Организация', value: '', link: { href: 'https://www.rusprofile.ru/id/11759511', phrase: 'АО "Международный Авиатерминал Хабаровск"' } },
      { title: 'Платформа', value: 'Excel' },
      { title: 'Доступ', value: 'Закрытый' },
    ],
    screens: [
      { src: '/projects/aeroakt/landing.jpg', alt: 'Аэроакт', size: '3/3' },
    ],
  },
];
