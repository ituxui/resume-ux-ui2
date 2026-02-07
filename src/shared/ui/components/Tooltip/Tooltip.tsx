import { useState, useRef, cloneElement } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  safePolygon,
  type Placement,
} from '@floating-ui/react';
import cn from 'classnames';
import type { ReactNode, ReactElement } from 'react';
import styles from './Tooltip.module.scss';

type TooltipSize = 'sm' | 'md';

export interface TooltipProps {
  /** Содержимое тултипа */
  content: ReactNode;
  /** Триггер-элемент (должен принимать ref) */
  children: ReactElement;
  /** Предпочтительное расположение */
  placement?: Placement;
  /** Размер тултипа */
  size?: TooltipSize;
  /** Отключить тултип */
  disabled?: boolean;
  /** Задержка показа в мс */
  showDelay?: number;
  /** Задержка скрытия в мс */
  hideDelay?: number;
  /** Интерактивный тултип (можно навести мышь на тултип) */
  interactive?: boolean;
  /** Дополнительный класс */
  className?: string;
}

const ARROW_SIZE = 6;
const OFFSET = 8;

export const Tooltip = ({
  content,
  children,
  placement = 'top',
  size = 'md',
  disabled = false,
  showDelay = 0,
  hideDelay = 150,
  interactive = true,
  className,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context, middlewareData, placement: finalPlacement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET + ARROW_SIZE),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 8,
      }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, {
    delay: { open: showDelay, close: hideDelay },
    move: false,
    handleClose: interactive ? safePolygon({
      blockPointerEvents: false,
    }) : null,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[finalPlacement.split('-')[0]] as string;

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;

  if (disabled || !content) {
    return children;
  }

  // Клонируем children и добавляем ref + props напрямую
  const trigger = cloneElement(children, {
    ref: refs.setReference as React.Ref<HTMLDivElement>,
    ...getReferenceProps(),
  } as React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>);

  return (
    <>
      {trigger}

      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={cn(
              styles.tooltip,
              styles[`size--${size}`],
              styles[`placement--${finalPlacement.split('-')[0]}`],
              className
            )}
          >
            <div className={styles.content}>{content}</div>
            <div
              ref={arrowRef}
              className={styles.arrow}
              style={{
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                [staticSide]: `-${ARROW_SIZE}px`,
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
