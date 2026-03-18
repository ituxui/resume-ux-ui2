// ═══════════════════════════════════════════════════════════════════════════
// ROUTES CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_IMG = "/images/miniatures/roadmap.sh.png";

export const landingRouteMap = {
  'landing': {
    path: '/',
    heading: 'Главная',
    breadcrumbTitle: 'Главная',
    description: 'Портфолио',
    img: DEFAULT_IMG
  },
  'anchor-projects': {
    path: '/#anchor-projects',
    heading: 'Проекты',
    breadcrumbTitle: 'Проекты',
    description: 'Проекты',
    img: DEFAULT_IMG
  },
  'anchor-about-me': {
    path: '/#anchor-about-me',
    heading: 'Обо мне',
    breadcrumbTitle: 'Обо мне',
    description: 'Личная информация и навыки',
    img: DEFAULT_IMG
  },
  'anchor-articles': {
    path: '/#anchor-articles',
    heading: 'Статьи',
    breadcrumbTitle: 'Статьи',
    description: 'Публикации и заметки',
    img: DEFAULT_IMG
  },
  'anchor-contacts': {
    path: '/#anchor-contacts',
    heading: 'Контакты',
    breadcrumbTitle: 'Контакты',
    description: 'Связаться со мной',
    img: DEFAULT_IMG
  },
} as const;


// Типы для landingRouteMap
export type LandingRouteKey = keyof typeof landingRouteMap;
export type LandingRouteEntry = (typeof landingRouteMap)[LandingRouteKey];
export type LandingRoutePath = LandingRouteEntry['path'];


export const innerPageRouteMap = {

  // ─── Кейсы ───
  'case-uip': {
    path: '/case/uip',
    heading: 'Многостраничный портал застройщика УИП',
    breadcrumbTitle: 'УИП',
    description: 'User Interface Platform',
    img: '/images/brand/УИП.png'
  },
  'case-tsd': {
    path: '/case/tsd',
    heading: 'Терминал сбора данных для завода',
    breadcrumbTitle: 'ТСД',
    description: 'Терминал сбора данных',
    img: '/images/brand/tsd-pictogram.png'
  },
  'case-dvipraz-landing': {
    path: '/case/dvipraz-landing',
    heading: 'Многостраничный портал для университета ДВИПРАЗ',
    breadcrumbTitle: 'Портал ДВИПРАЗ',
    description: 'Лендинг для Dvipraz',
    img: '/images/brand/ДВИПРАЗ.png'
  },
  // 'case-dvipraz-dashboard': {
  //   path: '/case/dvipraz-dashboard',
  //   heading: 'Панель управления для ДВИПРАЗ',
  //   breadcrumbTitle: 'ПУ ДВИПРАЗ',
  //   description: 'Панель управления для Dvipraz',
  //   img: '/images/brand/ДВИПРАЗ.png'
  // },
  'case-rdp-dashboard': {
    path: '/case/rdp-dashboard',
    heading: 'Сервис удалённого доступа RDP',
    breadcrumbTitle: 'RDP (ПУ)',
    description: 'RDP (ПУ)',
    img: '/images/brand/Stellar.png'
  },
  'case-aeroakt': {
    path: '/case/aeroakt',
    heading: 'Аэроакт',
    breadcrumbTitle: 'Аэроакт',
    description: 'Дизайн продукта для Аэроакт',
    img: '/images/brand/Аэроакт.png'
  },

  // ─── Обо мне (Бенто-секции) ───
  'aboutme-personal': {
    path: '/aboutme/personal',
    heading: 'Личная информация',
    breadcrumbTitle: 'Личное',
    description: 'Биография и факты',
    img: DEFAULT_IMG
  },
  'aboutme-design-systems': {
    path: '/aboutme/design-systems',
    heading: 'Дизайн-системы',
    breadcrumbTitle: 'Дизайн-системы',
    description: 'Опыт работы с дизайн-системами',
    img: DEFAULT_IMG
  },
  'aboutme-software': {
    path: '/aboutme/software',
    heading: 'Программы',
    breadcrumbTitle: 'Софт',
    description: 'Используемый софт',
    img: DEFAULT_IMG
  },
  'aboutme-education': {
    path: '/aboutme/education',
    heading: 'Образование',
    breadcrumbTitle: 'Образование',
    description: '30+ пройденных курсов',
    img: DEFAULT_IMG
  },
  'aboutme-soft-skills': {
    path: '/aboutme/soft-skills',
    heading: 'Софт-скиллы',
    breadcrumbTitle: 'Soft Skills',
    description: 'Мягкие навыки',
    img: DEFAULT_IMG
  },
  'aboutme-subscriptions': {
    path: '/aboutme/subscriptions',
    heading: 'Подписки',
    breadcrumbTitle: 'Подписки',
    description: 'UX, Product, UI ресурсы',
    img: DEFAULT_IMG
  },
  'aboutme-library': {
    path: '/aboutme/library',
    heading: 'Библиотека',
    breadcrumbTitle: 'Библиотека',
    description: 'Книги и сборники',
    img: DEFAULT_IMG
  },
  'aboutme-ai': {
    path: '/aboutme/ai',
    heading: 'Искусственный интеллект',
    breadcrumbTitle: 'AI',
    description: 'Использование ИИ в работе',
    img: DEFAULT_IMG
  },
  'aboutme-work-preferences': {
    path: '/aboutme/work-preferences',
    heading: 'Пожелания к работе',
    breadcrumbTitle: 'Работа',
    description: 'Ожидания от компании',
    img: DEFAULT_IMG
  },
  'aboutme-t-shape-skills': {
    path: '/aboutme/t-shape-skills',
    heading: 'T-Shape навыки',
    breadcrumbTitle: 'Skills',
    description: 'Стек технологий',
    img: DEFAULT_IMG
  },

  // ─── Статьи ───
  'article-type-definition-framework': {
    path: '/article/type-definition-framework',
    heading: 'Type Definition Framework',
    breadcrumbTitle: 'TDF',
    description: 'Фреймворк определения типов',
    img: DEFAULT_IMG
  },
  'article-figma-automation-macros': {
    path: '/article/figma-automation-macros',
    heading: 'Figma Automation Macros',
    breadcrumbTitle: 'Figma Macros',
    description: 'Макросы для автоматизации в Figma',
    img: DEFAULT_IMG
  },
  'article-alpha-colors': {
    path: '/article/alpha-colors',
    heading: 'Alpha Colors',
    breadcrumbTitle: 'Alpha Colors',
    description: 'Работа с альфа-каналами цветов',
    img: DEFAULT_IMG
  },
} as const;


// Типы для innerPageRouteMap
export type InnerPageRouteKey = keyof typeof innerPageRouteMap;
export type InnerPageRouteEntry = (typeof innerPageRouteMap)[InnerPageRouteKey];
export type InnerPageRoutePath = InnerPageRouteEntry['path'];

// Объединяем два объекта в один общий routeMap
export const routeMap = {
  ...landingRouteMap,
  ...innerPageRouteMap,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

// Тип ключей (например, 'landing' | 'case-aeroakt')
export type RouteKey = keyof typeof routeMap;

// Тип самого объекта конфигурации маршрута
export type RouteEntry = (typeof routeMap)[RouteKey];

// Тип пути (строка URL), например '/' | '/case/aeroakt'
// TypeScript автоматически выведет строковые литералы благодаря as const
export type RoutePath = RouteEntry['path'];
