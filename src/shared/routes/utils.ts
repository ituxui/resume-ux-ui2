// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

export const routeMap = {

  'landing': '/',
  'anchor-projects': '/#anchor-projects',
  'anchor-about-me': '/#anchor-about-me',

  // Кейсы
  'case-aeroakt': '/case/aeroakt',
  'dvipraz-dashboard': '/case/dvipraz-dashboard',
  'dvipraz-landing': '/case/dvipraz-landing',
  'rdp-dashboard': '/case/rdp-dashboard',
  'tsd': '/case/tsd',
  'uip': '/case/uip',

  // Статьи
  'article-type-definition-framework': '/article/type-definition-framework',
  'article-figma-automation-macros': '/article/figma-automation-macros',
  'article-alpha-colors': '/article/alpha-colors',

  // Обо мне (Бенто-секции)
  'aboutme-personal': '/aboutme/personal',                 // Личная информация
  'aboutme-design-systems': '/aboutme/design-systems',     // Дизайн-системы
  'aboutme-software': '/aboutme/software',                 // Программы
  'aboutme-education': '/aboutme/education',               // 30+ курсов
  'aboutme-soft-skills': '/aboutme/soft-skills',           // Софт-скиллы
  'aboutme-subscriptions': '/aboutme/subscriptions',       // Подписки (UX, Product...)
  'aboutme-library': '/aboutme/library',                   // Книги и другие сборники
  'aboutme-ai': '/aboutme/ai',                             // ИИ
  'aboutme-work-preferences': '/aboutme/work-preferences', // Пожелания к компании
  'aboutme-hard-skills': '/aboutme/hard-skills',           // T-shape / Стек технологий
} as const;

export type RouteKey = keyof typeof routeMap;
export type RoutePath = (typeof routeMap)[RouteKey];
