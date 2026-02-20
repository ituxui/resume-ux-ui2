import { routeMap } from "@shared/routes";

export const articlesList = [
  {
    key: 'article-type-definition-framework',
    heading: 'Фреймворк для определения типа тестирования',
    description: 'Статья о создании фреймворка, который помогает определить тип тестирования в различных проектах и сценариях',
    imageSrc: '/images/articles/Фреймворк для определения типа тестирования.png',
    to: routeMap['article-type-definition-framework']['path'],
  },
  {
    key: 'article-figma-automation-macros',
    heading: 'Автоматизация и макросы в Figma',
    description: 'Статья о том, как использовать макросы и автоматизацию для повышения эффективности работы в Figma',
    imageSrc: '/images/articles/Автоматизация и макросы в Figma.png',
    to: routeMap['article-figma-automation-macros']['path'],
  },
  {
    key: 'article-alpha-colors',
    heading: 'Как быстро создавать альфа-цвета из solid цветов',
    description: 'Статья о том, как быстро создавать альфа-цвета из solid цветов и для чего это нужно',
    imageSrc: '/images/articles/Как быстро создавать альфа-цвета из solid цветов.png',
    to: routeMap['article-alpha-colors']['path'],
  },
  //   {
  //   key: '',
  //   heading: '',
  //   description: '',
  //   imageSrc: '/images/articles/',
  //   to: routeMap['']['path'],
  // },
] as const;

export type Article = (typeof articlesList)[number];
export type ArticleKey = Article['key'];
