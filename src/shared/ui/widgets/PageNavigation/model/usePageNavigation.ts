import { useLocation } from 'react-router';
import { innerPageRouteMap, type RouteEntry } from '@shared/routes';

type NavItem = {
  key: string;
  entry: RouteEntry;
  label: string;
  buttonText: string;
} | null;

export const usePageNavigation = () => {
  const location = useLocation();

  // Получаем массив всех записей из карты маршрутов
  const entries = Object.entries(innerPageRouteMap);

  // Находим индекс текущей страницы
  // Сравниваем pathname. ВАЖНО: для хеш-роутера и якорей логика может отличаться,
  // здесь мы нормализуем путь, убирая хеши, если мы находимся на полноценной странице
  const currentIndex = entries.findIndex(([_, value]) => {
    // Если путь в конфиге совпадает с текущим pathname (для обычных страниц)
    if (value.path === location.pathname) return true;
    // Если путь в конфиге содержит якорь, а мы на этой странице (сложный кейс,
    // но для internal страниц обычно path уникален)
    return false;
  });

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const getLabelAndButton = (path: string, direction: 'next' | 'prev') => {
    const isNext = direction === 'next';

    if (path.includes('/case/')) {
      return {
        label: isNext ? 'Следующий кейс' : 'Предыдущий кейс',
        buttonText: isNext ? 'Читать кейс' : 'Назад'
      };
    }
    if (path.includes('/article/')) {
      return {
        label: isNext ? 'Следующая статья' : 'Предыдущая статья',
        buttonText: isNext ? 'Читать статью' : 'Назад'
      };
    }
    if (path.includes('/aboutme/')) {
      return {
        label: isNext ? 'Далее обо мне' : 'Ранее обо мне',
        buttonText: isNext ? 'Перейти' : 'Назад'
      };
    }
    // Дефолт (например для якорей)
    return {
      label: isNext ? 'Далее' : 'Назад',
      buttonText: isNext ? 'Перейти' : 'Назад'
    };
  };

  const createNavItem = (index: number, direction: 'next' | 'prev'): NavItem => {
    if (index < 0 || index >= entries.length) return null;

    const [key, entry] = entries[index];
    const { label, buttonText } = getLabelAndButton(entry.path, direction);

    return {
      key,
      entry,
      label,
      buttonText
    };
  };

  const prev = createNavItem(currentIndex - 1, 'prev');
  const next = createNavItem(currentIndex + 1, 'next');

  return { prev, next };
};
