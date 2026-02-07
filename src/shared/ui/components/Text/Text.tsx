import type { ElementType, ReactNode, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Text.module.scss';

export type TextRole =
  | 'body'
  | 'description'
  | 'bento'
  | 'button-md'
  | 'button-lg'
  | 'button-xl'
  | 'button-md-on_invert'
  | 'button-lg-on_invert'
  | 'button-xl-on_invert'
  | 'link'
  | 'table_td'
  | 'meta'
  | 'list'
  | 'caption'
  | 'label'
  | 'subheading';

type TextColorScheme = 'default' | 'muted';
type TextTag = 'p' | 'span' | 'div' | 'li' | 'td' | 'a' | 'label';

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  role: TextRole;
  colorScheme?: TextColorScheme;
  as?: TextTag;
  href?: string;
  className?: string;
}

const defaultTagMap: Record<TextRole, TextTag> = {
  'body': 'p',
  'description': 'p',
  'subheading': 'p',

  'bento': 'span',
  'button-md': 'span',
  'button-lg': 'span',
  'button-xl': 'span',
  'button-md-on_invert': 'span',
  'button-lg-on_invert': 'span',
  'button-xl-on_invert': 'span',
  'link': 'span',
  'table_td': 'span',
  'meta': 'span',
  'list': 'span',
  'caption': 'span',
  'label': 'span',
};

export const Text = ({
  children,
  role,
  colorScheme,
  as,
  href,
  className,
  ...props
}: TextProps) => {
  const tagFromMap = defaultTagMap[role];

  // Отладка
  if (!tagFromMap) {
    console.error('Unknown Text role:', role);
  }

  const Tag = (as ?? tagFromMap ?? 'span') as ElementType;
  const linkProps = Tag === 'a' ? { href } : {};

  return (
    <Tag
      className={cn(
        styles.text,
        styles[role],
        colorScheme && styles[colorScheme],
        className
      )}
      {...linkProps}
      {...props}
    >
      {children}
    </Tag>
  );
};
