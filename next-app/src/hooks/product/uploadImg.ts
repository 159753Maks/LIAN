// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпорт інтерфейсу IProductImg для типу зображення продукту
import { IProductImg } from '@/hooks/product/interface/product.interface';
// Імпорт типу AppWrapperContextType для доступу до глобального стану
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для завантаження зображення на сервер
export const uploadImg = async (
  fileName: string, // Назва файлу зображення
  mimeType: string, // MIME-тип зображення
  imageData: string, // Дані зображення у вигляді рядка
  context: AppWrapperContextType // Контекст додатка для доступу до токена
): Promise<IProductImg> => {
  try {
    // Отримання токена з контексту
    const token = context.token;

    // Виконання POST-запиту для завантаження зображення на сервер
    const response = await axios.post(
      `${getConfig('apiUrl')}/images`, // Кінцева точка API для завантаження зображення
      {
        fileName, // Назва файлу
        mimeType, // MIME-тип
        imageData, // Дані зображення
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Включення токена в заголовок авторизації
        },
      }
    );

    // Повернення даних завантаженого зображення
    return response.data;
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка під час завантаження зображення:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
