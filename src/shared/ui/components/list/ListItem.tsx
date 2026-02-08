import { type FC } from 'react';
import cn from 'classnames';
import { Text } from '../Text/Text';
import type { ListItemProps } from './List.types';
import { useListRole } from './ListContext';
import styles from './List.module.scss';

const textRoleMap = {
  body: 'body',
  person: 'caption',
} as const;

export const ListItem: FC<ListItemProps> = ({ className, children }) => {
  const listRole = useListRole();

  return (
    <li className={cn(styles.item, styles[`item-${listRole}`], className)}>
      <Text role={textRoleMap[listRole]}>{children}</Text>
    </li>
  );
};
