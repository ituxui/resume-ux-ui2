// ═══════════════════════════════════════════════════════════════════════════
// ROUTES CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_IMG = "/images/miniatures/roadmap.sh.png";

export const landingRouteMap = {
  'landing': {
    path: '/',
    heading: 'Главная',
    description: 'Портфолио',
    img: DEFAULT_IMG
  },
  'anchor-projects': {
    path: '/#anchor-projects',
    heading: 'Проекты',
    description: 'Избранные кейсы',
    img: DEFAULT_IMG
  },
  'anchor-about-me': {
    path: '/#anchor-about-me',
    heading: 'Обо мне',
    description: 'Личная информация и навыки',
    img: DEFAULT_IMG
  },
  'anchor-articles': {
    path: '/#anchor-articles',
    heading: 'Статьи',
    description: 'Публикации и заметки',
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
    heading: 'UIP',
    description: 'User Interface Platform',
    img: '/images/brand/УИП.png'
  },
  'case-tsd': {
    path: '/case/tsd',
    heading: 'Терминал сбора данных для кислородного оборудования',
    description: 'Терминал сбора данных',
    img: DEFAULT_IMG
  },
  'case-dvipraz-landing': {
    path: '/case/dvipraz-landing',
    heading: 'Dvipraz Landing',
    description: 'Лендинг для Dvipraz',
    img: DEFAULT_IMG
  },
  'case-dvipraz-dashboard': {
    path: '/case/dvipraz-dashboard',
    heading: 'Dvipraz Dashboard',
    description: 'Панель управления для Dvipraz',
    img: DEFAULT_IMG
  },
  'case-rdp-dashboard': {
    path: '/case/rdp-dashboard',
    heading: 'RDP Dashboard',
    description: 'Дашборд RDP',
    img: DEFAULT_IMG
  },
  'case-aeroakt': {
    path: '/case/aeroakt',
    heading: 'Аэроакт',
    description: 'Дизайн продукта для Аэроакт',
    img: DEFAULT_IMG
  },

  // ─── Обо мне (Бенто-секции) ───
  'aboutme-personal': {
    path: '/aboutme/personal',
    heading: 'Личная информация',
    description: 'Биография и факты',
    img: DEFAULT_IMG
  },
  'aboutme-design-systems': {
    path: '/aboutme/design-systems',
    heading: 'Дизайн-системы',
    description: 'Опыт работы с дизайн-системами',
    img: DEFAULT_IMG
  },
  'aboutme-software': {
    path: '/aboutme/software',
    heading: 'Программы',
    description: 'Используемый софт',
    img: DEFAULT_IMG
  },
  'aboutme-education': {
    path: '/aboutme/education',
    heading: 'Образование',
    description: '30+ пройденных курсов',
    img: DEFAULT_IMG
  },
  'aboutme-soft-skills': {
    path: '/aboutme/soft-skills',
    heading: 'Софт-скиллы',
    description: 'Мягкие навыки',
    img: DEFAULT_IMG
  },
  'aboutme-subscriptions': {
    path: '/aboutme/subscriptions',
    heading: 'Подписки',
    description: 'UX, Product, UI ресурсы',
    img: DEFAULT_IMG
  },
  'aboutme-library': {
    path: '/aboutme/library',
    heading: 'Библиотека',
    description: 'Книги и сборники',
    img: DEFAULT_IMG
  },
  'aboutme-ai': {
    path: '/aboutme/ai',
    heading: 'Искусственный интеллект',
    description: 'Использование ИИ в работе',
    img: DEFAULT_IMG
  },
  'aboutme-work-preferences': {
    path: '/aboutme/work-preferences',
    heading: 'Пожелания к работе',
    description: 'Ожидания от компании',
    img: DEFAULT_IMG
  },
  'aboutme-t-shape-skills': {
    path: '/aboutme/t-shape-skills',
    heading: 'T-Shape навыки',
    description: 'Стек технологий',
    img: DEFAULT_IMG
  },

  // ─── Статьи ───
  'article-type-definition-framework': {
    path: '/article/type-definition-framework',
    heading: 'Type Definition Framework',
    description: 'Фреймворк определения типов',
    img: DEFAULT_IMG
  },
  'article-figma-automation-macros': {
    path: '/article/figma-automation-macros',
    heading: 'Figma Automation Macros',
    description: 'Макросы для автоматизации в Figma',
    img: DEFAULT_IMG
  },
  'article-alpha-colors': {
    path: '/article/alpha-colors',
    heading: 'Alpha Colors',
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
