import { type RouteKey } from '@shared/routes';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Кортеж продукта:
 * [название] — просто текст
 * [название, routeKey] — внутренняя ссылка
 * [название, null, true] — текст с пометкой (NDA)
 */
export type ProductTuple =
  | [name: string]
  | [name: string, route: RouteKey]
  | [name: string, route: null, isNda: boolean];

export interface ItSphereItem {
  sphere: string;
  additionalTitles: string;
  products: ProductTuple[];
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

export const itSpheresData: ItSphereItem[] = [
  // NDA проекты (явно указываем null и true)
  {
    sphere: 'Logistics Tech, E-commerce',
    additionalTitles: 'Supply Chain, WMS, Tracking Systems, Cross-border',
    products: [
      ['Система международных операторов доставки грузов', null, true],
    ],
  },
  {
    sphere: 'PropTech / IoT',
    additionalTitles: 'Smart Home, SaaS',
    products: [
      ['Система для управляющих компаний ЖКХ со встроенным умным домом', null, true],
    ],
  },
  {
    sphere: 'AI Tech',
    additionalTitles: 'Computer Vision, Video Analytics, Machine Learning',
    products: [
      ['Система видеонаблюдения с искусственным интеллектом', null, true],
    ],
  },
  {
    sphere: 'MarTech / Web Dev',
    additionalTitles: 'SaaS Marketing, CRO, Landing Pages',
    products: [
      ['Лендинги IT-продуктов', null, false],
    ],
  },
  {
    sphere: 'EdTech / Cybersecurity Education',
    additionalTitles: 'Application Security Training',
    products: [
      ['Образовательная платформа по курсам безопасности', null, true],
    ],
  },

  // Проекты с кейсами (ссылки)
  {
    sphere: 'Media Tech / Web Dev',
    additionalTitles: 'CMS, Web Portals, Content Management',
    products: [
      ['Информационный портал для Института', 'dvipraz-landing'],
    ],
  },
  {
    sphere: 'B2B SaaS, HR Management',
    additionalTitles: 'CMS, Web Portals, Content Management',
    products: [
      ['Система управления организаций', 'dvipraz-dashboard'],
    ],
  },

  {
    sphere: 'Cybersecurity Tech',
    additionalTitles: 'Access Control Systems, Network Security, Application Security, Remote Access Security',
    products: [
      ['Приложение кибербезопасности (Remote Desktop Protocol)', 'rdp-dashboard'],
    ],
  },
  {
    sphere: 'ConTech / PropTech',
    additionalTitles: 'Enterprise SaaS, Project Management',
    products: [
      ['Портал строительной компании', 'uip'],
    ],
  },
  {
    sphere: 'IIoT / Industry 4.0',
    additionalTitles: 'Embedded Systems, Industrial Automation',
    products: [
      ['Терминалы сбора данных промышленных предприятий', 'tsd'],
    ],
  },
  {
    sphere: 'Travel Tech',
    additionalTitles: 'Transportation, Airport Management Systems',
    products: [
      ['Система учёта пассажиров для аэропортов', 'aeroakt'],
    ],
  },
];
