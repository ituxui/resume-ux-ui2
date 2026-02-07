
import type { ButtonProps } from '../Button';

export type ButtonType = 'download' | 'internal' | 'modal' | 'external' | 'anchor' | 'email';

type GetButtonTypeParams = Pick<ButtonProps, 'href' | 'to' | 'download' | 'onClick' | 'anchorId'>;

export const getButtonType = (props: GetButtonTypeParams): ButtonType => {
  const { href, to, download, onClick, anchorId } = props;

  if (download || (href && href.match(/\.(pdf|zip|doc|docx|xls|xlsx|png|jpg|jpeg|gif|svg)$/i))) {
    return 'download';
  }

  // Добавить проверку на mailto
  if (href && href.startsWith('mailto:')) {
    return 'email';
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
