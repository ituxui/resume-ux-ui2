import type { ElementType, ReactNode, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Heading.module.scss';

// Роли заголовков
type HeadingRole =
  | 'hero'     // Главный посыл страницы
  | 'page'     // Заголовок страницы/раздела
  | 'section'  // Начало смыслового блока
  | 'subsection'
  | 'article'  // Статья
  | 'feature'  // Название фичи/преимущества
  | 'label'    // Подпись к элементу
  | 'question' // Вопрос (FAQ, интерактив)
  | 'result-heading' // Вопрос (FAQ, интерактив)
  | 'result-value' // Вопрос (FAQ, интерактив)
  | 'quote'    // Выделенная цитата
  | 'stat'     // Цифра/метрика
  | 'group'    // Объединяет группу элементов
  | 'item'     // Элемент списка/карточки
  | 'meta'    // Дата, автор, категория
  | 'bento';    // bento блок

// Семантические теги для заголовков
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  role: HeadingRole;
  as?: HeadingTag;
  className?: string;
}

// Маппинг ролей на семантические теги по умолчанию
const defaultTagMap: Record<HeadingRole, HeadingTag> = {
  hero: 'h1',
  page: 'h1',
  section: 'h2',
  subsection: 'h3',
  article: 'h3',
  feature: 'h3',
  label: 'span',
  question: 'h3',
  [`result-heading`]: 'h3',
  [`result-value`]: 'h3',
  quote: 'p',
  stat: 'p',
  group: 'h4',
  item: 'h4',
  bento: 'h4',
  meta: 'span',
};

export const Heading = ({
  children,
  role,
  as,
  className,
  ...props
}: HeadingProps) => {
  const Tag = as ?? defaultTagMap[role] as ElementType;

  return (
    <Tag
      className={cn(styles.heading, styles[role], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
