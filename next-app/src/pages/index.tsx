import { useEffect } from 'react'; // Імпортуємо useEffect та useState з React

import FooterComponent from '@/components/generic/footer.component'; // Імпортуємо компонент FooterComponent
import HeaderComponent from '@/components/generic/header.component'; // Імпортуємо компонент HeaderComponent
import NavigationComponent from '@/components/main/navigation.component';
import { useAppContext } from '@/pages/_appWrapper'; // Імпортуємо компонент NavigationComponent

export default function Home() {
  const context = useAppContext(); // Отримуємо контекст додатку
  // Використовуємо хук useEffect для зміни заголовку сторінки
  useEffect(() => {
    document.title = 'Home'; // Встановлюємо заголовок сторінки на 'Home'
  }, []); // Виконуємо цей ефект лише один раз, коли компонент монтується

  // Повертаємо JSX для рендерингу компоненту
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      {' '}
      {/* Встановлюємо flex контейнер, який займатиме всю висоту екрану */}
      <HeaderComponent />{' '}
      {/* Рендеримо HeaderComponent і передаємо йому функцію setEditMode */}
      <NavigationComponent isEditMode={context.isEditMode} />{' '}
      {/* Рендеримо NavigationComponent і передаємо йому значення isEditMode */}
      <FooterComponent /> {/* Рендеримо FooterComponent */}
    </div>
  );
}
