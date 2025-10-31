import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            // Убираем класс при скролле вверх, чтобы анимация срабатывала снова
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.05, // Низкий порог для быстрого срабатывания
        rootMargin: '0px 0px -5% 0px' // Уменьшенный отступ для более раннего срабатывания
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return elementRef;
}