import { type ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import styles from './PageWrapper.module.scss';
import { Link, Text } from '@shared/ui';
import { routeMap } from '@shared/routes';
import { Popover } from '@shared/ui/components';
import { EmailPart, PageNavigation } from '@shared/ui/widgets';

// Описываем тип пропсов
interface PageWrapperProps {
  children: ReactNode;
}

type PageSectionType = 'landing' | 'case' | 'aboutme' | 'article';

export function PageWrapper({ children }: PageWrapperProps) {
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Логика определения типа секции
  const getPageType = (path: string): PageSectionType => {
    // Проверка на вложенные страницы
    if (path.startsWith('/case')) return 'case';
    if (path.startsWith('/aboutme')) return 'aboutme';
    if (path.startsWith('/article')) return 'article';

    // По дефолту (root, /#, /#something) считаем лендингом
    return 'landing';
  };

  const pageType = getPageType(pathname);

  // Следим за высотой меню и пишем в CSS-переменную
  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const updateHeight = (height: number) => {
      document.documentElement.style.setProperty('--js-setted-top-menu-height', `${height}px`);
    };

    // Инициализируем ResizeObserver
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // borderBoxSize предпочтительнее, так как учитывает padding и border
        if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
          updateHeight(entry.borderBoxSize[0].blockSize);
        } else {
          // Fallback для старых браузеров
          updateHeight(entry.contentRect.height);
        }
      }
    });

    observer.observe(menuElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper} data-page-type={pageType}>
      <div className={styles.menu} id="_topMenu" ref={menuRef}>
        <div className={styles['menu--wrapper']}>
          <div className={styles['menu--left']}>
            <Text role='link-sm' colorScheme='muted'>Юрий, UX UI проектировщик</Text>

            <Link phrase="Скачать резюме" href="/files/resume-ux-ui.vercel.app.pdf" accent='muted' size="sm" />

            {pageType !== 'landing' && <Link phrase="Главная" to={routeMap['landing']['path']} accent='muted' size='sm' />}
            <Link phrase="Портфолио" to={routeMap['anchor-projects']['path']} accent='muted' size='sm' />
            <Link phrase="Обо мне" to={routeMap['anchor-about-me']['path']} accent='muted' size='sm' />
            <Link phrase="Статьи" to={routeMap['anchor-articles']['path']} accent='muted' size='sm' />
          </div>

          <div className={styles['menu--center']}>
            {/* Пример: скрываем "Главная" в центре, если мы уже на главной, или наоборот */}
            {pageType !== 'landing' && (
              <Link phrase="Главная" to={routeMap['landing']['path']} accent='muted' size='sm' />
            )}
          </div>

          <div className={styles['menu--right']}>
            <Popover
              trigger={<Link phrase="Email" accent='muted' size="sm" />}
              content={
                <EmailPart />
              }
            />
            <Link phrase="Телеграм" href="https://t.me/Rumar1" accent='muted' size="sm" />
            <Link phrase="Вконтакте" href="https://vk.com/im/convo/16759075?entrypoint=list_all" accent='muted' size="sm" />
            <Link phrase="Max" href="https://max.ru/u/f9LHodD0cOJG5yySL7VLbp-sA3n4FO6R1DBs_xxekQ7dvzkrUA4XxhNNht4" accent='muted' size="sm" />
          </div>
        </div>
      </div>
      {children}
      <PageNavigation />
    </div>
  );
}
