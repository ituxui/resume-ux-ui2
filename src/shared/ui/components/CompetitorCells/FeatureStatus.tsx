import { type FC } from 'react';
import { Icon } from '../../atoms/Icon/Icon'; // Предполагаю путь к Icon
import type { CompetitorFeatureStatus } from '@shared/data/competitors/competitors.types';
import cn from 'classnames';
import styles from './CompetitorCells.module.scss';

interface Props {
  status: CompetitorFeatureStatus;
}

export const FeatureStatus: FC<Props> = ({ status }) => {
  if (status === true) {
    return <span className={cn(styles.icon, styles.check)}><Icon name="check" size={'md'} /></span>;
  }
  if (status === 'exclamationMark') {
    // Если нет иконки восклицательного знака, используем circle
    return <span className={cn(styles.icon, styles.warn)}><Icon name="asterisk" size={'md'} /></span>;
  }
  return <span className={cn(styles.icon, styles.cross)}><Icon name="x" size={'md'} /></span>;
};
