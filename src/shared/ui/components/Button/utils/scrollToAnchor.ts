export const scrollToAnchor = (idOrPath: string): void => {
  if (!idOrPath) return;

  // Извлекаем ID, даже если передали "/#anchor-projects"
  const hashParts = idOrPath.split('#');
  const id = hashParts.length > 1 ? hashParts.pop() : idOrPath;

  if (!id) return;

  const element = document.getElementById(id);

  if (element) {
    // Высота отступа (например, высота FloatingMenu + запас)
    const yOffset = -100;

    // Вычисляем абсолютную позицию элемента на странице с учетом отступа
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
};
