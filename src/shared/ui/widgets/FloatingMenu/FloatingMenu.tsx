import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@shared/ui/components/Button';
import { landingRouteMap } from '@shared/routes';

import styles from './FloatingMenu.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { RESUME_URL } from '@shared/data';


export const FloatingMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Логика скролла
  useEffect(() => {
    const handleScroll = () => {
      // На мобильных (<= 768px) показываем всегда (логика в CSS через !important или медиа-запрос)
      // На десктопе - если скролл > 100
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setIsVisible(true);
      } else {
        setIsVisible(window.scrollY > 100);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Закрываем меню при смене страницы
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);



  return (
    <>
      {/* ─── ISLAND BAR ─── */}
      <div className={cn(styles.islandWrapper, { [styles.visible]: isVisible || isMenuOpen })}>

        {/* 1. Avatar (Left) */}
        <div className={styles.avatar} onClick={() => navigate('/')}>
          <img src={landingRouteMap['landing'].img} alt="Avatar" />
        </div>

        {/* 2. Breadcrumbs (Center) - скрываем если меню открыто (опционально, но так чище) */}
        <div className={styles.center} style={{ opacity: isMenuOpen ? 0 : 1 }}>
          <Breadcrumbs />
        </div>

        {/* 3. Menu Button (Right) */}
        <div className={styles.menuButton}>
          <Button
            accent="primary"
            face="light"
            size="lg"
            content="icon"
            // Меняем иконку: menu (3 полоски) или x (крестик)
            iconName={isMenuOpen ? 'x' : 'menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          // Поднимаем z-index кнопки, чтобы она была поверх оверлея (хотя она внутри острова, а остров z=1000)
          // style={{ position: 'relative', zIndex: 1001 }}
          />
        </div>
      </div>

      {/* ─── FULLSCREEN OVERLAY ─── */}
      <div className={cn(styles.overlay, { [styles.open]: isMenuOpen })}>
        <div className={styles.menuContent}>

          {/* Навигационные ссылки */}
          <nav className={styles.navLinks}>

            {/* Главная */}
            <Button
              accent="primary"
              face="light"
              size="xl"
              width="full"
              to={landingRouteMap['landing'].path}
            >
              {landingRouteMap['landing'].heading}
            </Button>

            {/* Портфолио (Кейсы) */}
            <Button
              accent="primary"
              face="light"
              size="xl"
              width="full"
              // anchorId={landingRouteMap['anchor-projects'].path.replace('/#', '')}
              // Для навигации с других страниц используем href c полным путем
              to={landingRouteMap['anchor-projects'].path}
            >
              {landingRouteMap['anchor-projects'].heading}
            </Button>

            {/* Обо мне */}
            <Button
              accent="primary"
              face="light"
              size="xl"
              width="full"
              to={landingRouteMap['anchor-about-me'].path}
            >
              {landingRouteMap['anchor-about-me'].heading}
            </Button>

            {/* Статьи */}
            <Button
              accent="primary"
              face="light"
              size="xl"
              width="full"
              to={landingRouteMap['anchor-articles'].path}
            >
              {landingRouteMap['anchor-articles'].heading}
            </Button>

            {/* Контакты */}
            <Button
              accent="primary"
              face="light"
              size="xl"
              width="full"
              to={landingRouteMap['anchor-contacts'].path}
            >
              {landingRouteMap['anchor-contacts'].heading}
            </Button>

            {/* Скачать резюме */}
            <Button
              accent="primary"
              face="solid" // Выделим цветом
              size="xl"
              width="full"
              download
              href={RESUME_URL}
              iconName="download"
              content="text-icon"
            >
              Скачать резюме
            </Button>

          </nav>

          {/* Разделитель или отступ
          <div style={{ height: 16 }} /> */}

          {/* Виджет EmailPart */}
          {/* <EmailPart /> */}

        </div>
      </div>
    </>
  );
};
