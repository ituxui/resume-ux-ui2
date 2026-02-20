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
  const entries = Object.entries(innerPageRouteMap);
  const total = entries.length;

  // Находим текущий индекс
  const currentIndex = entries.findIndex(([_, value]) => value.path === location.pathname);

  // Если страница не найдена в списке (например, 404), возвращаем null
  if (currentIndex === -1 || total === 0) {
    return { prev: null, next: null };
  }

  // ─── ЛОГИКА ЦИКЛА (CIRCULAR) ───

  // Вычисляем индекс предыдущего элемента
  // Если мы в начале (0), переходим в конец (total - 1)
  const prevIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;

  // Вычисляем индекс следующего элемента
  // Если мы в конце (total - 1), переходим в начало (0)
  const nextIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;


  // Хелпер для получения текстов
  const getMeta = (path: string, direction: 'next' | 'prev') => {
    const isNext = direction === 'next';

    if (path.includes('/case/')) {
      return {
        label: isNext ? 'Следующий кейс' : 'Предыдущий кейс',
        buttonText: isNext ? 'Открыть' : 'Назад'
      };
    }
    if (path.includes('/article/')) {
      return {
        label: isNext ? 'Следующая статья' : 'Предыдущая статья',
        buttonText: isNext ? 'Читать' : 'Назад'
      };
    }
    // Дефолт
    return {
      label: isNext ? 'Далее обо мне' : 'Ранее обо мне',
      buttonText: isNext ? 'Перейти' : 'Назад'
    };
  };

  // Создание объекта навигации
  const createItem = (index: number, dir: 'next' | 'prev'): NavItem => {
    const [key, entry] = entries[index];
    const { label, buttonText } = getMeta(entry.path, dir);
    return { key, entry, label, buttonText };
  };

  return {
    prev: createItem(prevIndex, 'prev'),
    next: createItem(nextIndex, 'next')
  };
};
