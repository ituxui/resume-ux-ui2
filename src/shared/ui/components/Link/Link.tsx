import { forwardRef, type ReactNode, type MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router';
import cn from 'classnames';
import styles from './Link.module.scss';
import { Icon, type IconSize } from '@shared/ui/atoms/Icon/Icon';

export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkAccent = 'muted' | 'default' | 'high';

type LinkType = 'download' | 'internal' | 'modal' | 'external' | 'anchor';

export interface LinkProps {
  phrase: ReactNode;
  size?: LinkSize;
  accent?: LinkAccent;
  invert?: boolean;
  className?: string;
  isActive?: boolean;

  href?: string;
  to?: string;
  download?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  anchorId?: string;

  target?: string;
  rel?: string;

  [key: string]: any;
}

const sizeToIconSize: Record<LinkSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const getLinkType = (props: Partial<LinkProps>): LinkType => {
  const { href, to, download, onClick, anchorId } = props;

  if (download || (href && href.match(/\.(pdf|zip|doc|docx|xls|xlsx|png|jpg|jpeg|gif|svg)$/i))) {
    return 'download';
  }

  if (anchorId || (href && href.startsWith('#'))) {
    return 'anchor';
  }

  if (to) {
    return 'internal';
  }

  if (onClick && !href && !to) {
    return 'modal';
  }

  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    return 'external';
  }

  if (href) {
    return 'internal';
  }

  return 'modal';
};

const getIconName = (type: LinkType) => {
  switch (type) {
    case 'download':
      return 'download';
    case 'internal':
      return 'arrow-right';
    case 'modal':
      return 'expand';
    case 'external':
      return 'arrow-top-right';
    case 'anchor':
      return 'arrow-down-right';
    default:
      return 'arrow-right';
  }
};

const scrollToAnchor = (id: string) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const getFilenameFromUrl = (url: string): string => {
  const pathname = new URL(url, window.location.origin).pathname;
  const filename = pathname.split('/').pop();
  return filename || 'download';
};

const downloadFile = async (url: string, filename?: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || getFilenameFromUrl(url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    window.open(url, '_blank');
  }
};

export const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps>(({
  phrase,
  size = 'md',
  accent = 'default',
  invert = false,
  className,
  isActive,
  href,
  to,
  download,
  onClick,
  anchorId,
  target,
  rel,
  ...props
}, ref) => {
  const linkType = getLinkType({ phrase, href, to, download, onClick, anchorId });
  const iconName = getIconName(linkType);
  const iconSize = sizeToIconSize[size as LinkSize];

  const classes = cn(
    styles.link,
    styles[size],
    styles[accent],
    invert && styles.invert,
    isActive && styles.active,
    className
  );

  const content = (
    <>
      <span className={styles.phrase}>{phrase}</span>
      <Icon name={iconName} size={iconSize} className={styles.icon} />
    </>
  );

  // Обёртка для обработчиков с stopPropagation
  const handleClick = (e: MouseEvent, callback?: () => void) => {
    e.stopPropagation();
    callback?.();
    onClick?.(e);
  };

  // 1. Download
  if (linkType === 'download' && href) {
    const filename = typeof download === 'string' ? download : undefined;

    return (
      <button
        ref={ref as any}
        type="button"
        className={classes}
        onClick={(e) => handleClick(e, () => downloadFile(href, filename))}
        {...props}
      >
        {content}
      </button>
    );
  }

  // 2. Internal (React Router)
  if (linkType === 'internal' && to) {
    return (
      <RouterLink
        ref={ref as any}
        to={to}
        className={classes}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {content}
      </RouterLink>
    );
  }

  // 3. Anchor
  if (linkType === 'anchor') {
    const targetId = anchorId || href || '';
    return (
      <a
        ref={ref as any}
        href={targetId}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          handleClick(e, () => scrollToAnchor(targetId));
        }}
        {...props}
      >
        {content}
      </a>
    );
  }

  // 4. External
  if (linkType === 'external') {
    return (
      <a
        ref={ref as any}
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={classes}
        onClick={(e) => handleClick(e)}
        {...props}
      >
        {content}
      </a>
    );
  }

  // 5. Modal (button)
  return (
    <button
      ref={ref as any}
      type="button"
      className={classes}
      onClick={(e) => handleClick(e)}
      {...props}
    >
      {content}
    </button>
  );
});

Link.displayName = 'Link';
