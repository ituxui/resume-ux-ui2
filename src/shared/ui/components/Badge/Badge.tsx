import type { FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router';
import cn from 'classnames';
import styles from './Badge.module.scss';

type BadgeKind = 'island';
type BadgeSize = 'lg' | 'xl';

interface BadgeProps {
  imageSrc?: string;
  text?: string;
  kind?: BadgeKind;
  size?: BadgeSize;
  className?: string;
  imageAlt?: string;

  // Link functionality
  href?: string;
  to?: string;
  download?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  anchorId?: string;
  target?: string;
  rel?: string;
}

type LinkType = 'download' | 'internal' | 'external' | 'anchor' | 'button' | 'static';

const getLinkType = (props: Partial<BadgeProps>): LinkType => {
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

  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    return 'external';
  }

  if (href) {
    return 'internal';
  }

  if (onClick) {
    return 'button';
  }

  return 'static';
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

export const Badge: FC<BadgeProps> = ({
  imageSrc,
  text,
  kind = 'island',
  size = 'xl',
  className,
  imageAlt = '',
  href,
  to,
  download,
  onClick,
  anchorId,
  target,
  rel,
}) => {
  const hasText = Boolean(text);
  const hasImage = Boolean(imageSrc);
  const linkType = getLinkType({ href, to, download, onClick, anchorId });
  const isInteractive = linkType !== 'static';

  const classes = cn(
    styles.badge,
    styles[`badge--kind-${kind}`],
    styles[`badge--size-${size}`],
    {
      [styles['badge--with-text']]: hasText,
      [styles['badge--with-image']]: hasImage,
      [styles['badge--interactive']]: isInteractive,
    },
    className
  );

  const content = (
    <>
      {hasImage && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async" fetchPriority="low"
          className={styles.badge__image}
        />
      )}
      {hasText && (
        <span className={styles.badge__text}>{text}</span>
      )}
    </>
  );

  // 1. Download
  if (linkType === 'download' && href) {
    const filename = typeof download === 'string' ? download : undefined;

    return (
      <button
        type="button"
        className={classes}
        onClick={async (e) => {
          await downloadFile(href, filename);
          onClick?.(e);
        }}
      >
        {content}
      </button>
    );
  }

  // 2. Internal (React Router)
  if (linkType === 'internal' && to) {
    return (
      <RouterLink
        to={to}
        className={classes}
        onClick={onClick}
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
        href={targetId}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          scrollToAnchor(targetId);
          onClick?.(e);
        }}
      >
        {content}
      </a>
    );
  }

  // 4. External
  if (linkType === 'external') {
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // 5. Button (onClick only)
  if (linkType === 'button') {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  // 6. Static (no interaction)
  return (
    <div className={classes}>
      {content}
    </div>
  );
};
