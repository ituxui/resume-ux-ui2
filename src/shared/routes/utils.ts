// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

export const routeMap = {
  // Продукты
  'aeroakt': '/aeroakt',
  'dvipraz-dashboard': '/dvipraz-dashboard',
  'dvipraz-landing': '/dvipraz-landing',
  'landing': '/',
  'rdp-dashboard': '/rdp-dashboard',
  'tsd': '/tsd',
  'uip': '/uip',

  // Статьи
  'article-type-definition-framework': '/articles/type-definition-framework', // 'Test Type Definition Framework',
  'article-figma-automation-macros': '/articles/figma-automation-macros', // 'Figma Automation and Macros',
  'article-alpha-colors': '/articles/alpha-colors', // 'Alpha Colors from Solid Colors',
} as const;

export type RouteKey = keyof typeof routeMap;
export type RoutePath = (typeof routeMap)[RouteKey];
