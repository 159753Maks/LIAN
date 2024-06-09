// Імпортуємо CSS-файл бібліотеки Font Awesome для використання іконок
import '@fortawesome/fontawesome-free/css/all.min.css';

// Імпортуємо глобальні стилі для додатка
import '../styles/global.css';

// Імпортуємо тип AppProps для типізації властивостей додатка в Next.js
import type { AppProps } from 'next/app';

// Імпортуємо компонент AppWrapper, який обгортає весь додаток
import { AppWrapper } from '@/pages/_appWrapper';

/**
 * Основний компонент додатка.
 * @param {AppProps} param0 - Властивості додатка, які передаються Next.js.
 * @returns {JSX.Element} - Основний компонент додатка, обгорнутий в AppWrapper.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Обгортаємо весь додаток в AppWrapper для надання контексту всім компонентам
    <AppWrapper>
      {/* Відображення компоненту сторінки з відповідними властивостями */}
      <Component {...pageProps} />
    </AppWrapper>
  );
}

// Експортуємо компонент MyApp як основний компонент додатка за замовчуванням
export default MyApp;
