import { useState, useEffect, cloneElement, type ReactElement, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import styles from './Popover.module.scss';

interface PopoverProps {
  trigger: ReactElement;
  content: ReactNode;
  placement?: Placement;
}

export const Popover = ({
  trigger,
  content,
  placement = 'bottom-start'
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 10 }),
      shift({ padding: 10 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setShouldRender(true);
      });

      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      setShouldRender(false);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, isMobile]);

  const handleOverlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      {cloneElement(trigger, {
        ref: refs.setReference,
        ...getReferenceProps(),
        isActive: isOpen,
      } as any)}

      {isOpen && isMobile && createPortal(
        <div
          className={styles.overlay}
          data-show={shouldRender}
          onClick={handleOverlayClick}
          onTouchStart={handleOverlayClick}
          onTouchEnd={handleOverlayClick}
        />,
        document.body
      )}

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={isMobile}>
            <div
              ref={refs.setFloating}
              style={isMobile ? undefined : floatingStyles}
              className={`${styles.popoverWrapper} ${isMobile ? styles.mobile : ''}`}
              {...getFloatingProps()}
            >
              <div
                className={styles.popover}
                data-show={shouldRender}
              >
                {content}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
