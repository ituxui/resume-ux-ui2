import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation, } from 'react-router';

import { Button } from '@shared/ui/components/Button';
import { landingRouteMap } from '@shared/routes';

import styles from './FloatingMenu.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { RESUME_URL } from '@shared/data';

import { useScrollLock } from '@hooks/useScrollLock';

export const FloatingMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();

  // Блокировка скролла страницы (скроллбар остаётся!)
  useScrollLock(isMenuOpen);

  // Логика скролла для Острова
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 767.98;
      if (isMobile) {
        setIsVisible(true);
      } else {
        setIsVisible(window.scrollY > 100);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Закрываем меню при смене страницы
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <div className={styles.mobileBackdrop} aria-hidden />
      {/* ─── ISLAND BAR ─── */}
      <div className={cn(styles.islandWrapper, { [styles.visible]: isVisible || isMenuOpen })}>
        {/* <div className={styles.avatar} onClick={() => navigate('/')}>
          <img src={'/images/my-photos/ava.png'} alt="Avatar" />
        </div> */}

        <div className={styles.center}>
          <Breadcrumbs />
        </div>

        <div className={styles.menuButton}>
          <Button
            accent="primary"
            face="light"
            size="md"
            content="icon"
            iconName={isMenuOpen ? 'x' : 'menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* ─── FULLSCREEN OVERLAY ─── */}
      {/* data-scroll-allow разрешает скролл ВНУТРИ оверлея */}
      <div
        className={cn(styles.overlay, { [styles.open]: isMenuOpen })}
        onClick={() => setIsMenuOpen(false)}
        data-scroll-allow
      >
        <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
          <nav className={styles.navLinks}>
            <Button accent="primary" face="light" size="xl" width="full" to={landingRouteMap['landing'].path}>
              {landingRouteMap['landing'].heading}
            </Button>
            <Button accent="primary" face="light" size="xl" width="full" to={landingRouteMap['anchor-projects'].path}>
              {landingRouteMap['anchor-projects'].heading}
            </Button>
            <Button accent="primary" face="light" size="xl" width="full" to={landingRouteMap['anchor-about-me'].path}>
              {landingRouteMap['anchor-about-me'].heading}
            </Button>
            <Button accent="primary" face="light" size="xl" width="full" to={landingRouteMap['anchor-articles'].path}>
              {landingRouteMap['anchor-articles'].heading}
            </Button>
            <Button accent="primary" face="light" size="xl" width="full" to={landingRouteMap['anchor-contacts'].path}>
              {landingRouteMap['anchor-contacts'].heading}
            </Button>
            <Button accent="primary" face="solid" size="xl" width="full" download href={RESUME_URL} iconName="download" content="text-icon">
              Скачать резюме
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};
