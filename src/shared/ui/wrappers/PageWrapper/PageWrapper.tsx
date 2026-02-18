import { type ReactNode } from 'react';
import { useLocation } from 'react-router';
import styles from './PageWrapper.module.scss';
import { Link, Text } from '@shared/ui';
import { routeMap } from '@shared/routes';
import { Popover } from '@shared/ui/components';
import { EmailPart } from '@shared/ui/sections';

// Описываем тип пропсов
interface PageWrapperProps {
  children: ReactNode;
}

type PageSectionType = 'landing' | 'case' | 'aboutme' | 'article';

export function PageWrapper({ children }: PageWrapperProps) {
  const { pathname } = useLocation();

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

  return (
    <div className={styles.wrapper} data-page-type={pageType}>
      <div className={styles.menu}>
        <div className={styles['menu--wrapper']}>
          <div className={styles['menu--left']}>
            <Text role='link-sm' colorScheme='muted'>Юрий, UX UI проектировщик</Text>

            {/* Меню меняется или подсвечивается в зависимости от pageType, если нужно */}
            {pageType !== 'landing' && <Link phrase="Главная" to={routeMap['landing']} accent='muted' size='sm' />}
            <Link phrase="Портфолио" to={routeMap['anchor-projects']} accent='muted' size='sm' />
            <Link phrase="Обо мне" to={routeMap['anchor-about-me']} accent='muted' size='sm' />
            <Link phrase="Скачать резюме" href="/files/resume-ux-ui.vercel.app.pdf" accent='muted' size="sm" />
          </div>

          <div className={styles['menu--center']}>
            {/* Пример: скрываем "Главная" в центре, если мы уже на главной, или наоборот */}
            {pageType !== 'landing' && (
              <Link phrase="Главная" to={routeMap['landing']} accent='muted' size='sm' />
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
    </div>
  );
}
