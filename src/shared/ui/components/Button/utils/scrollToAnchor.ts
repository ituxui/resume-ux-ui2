export const scrollToAnchor = (id: string): void => {
  const element = document.getElementById(id.replace('#', ''));

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};
