// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпорт інтерфейсу IProduct для типу продукту
import { IProduct } from '@/hooks/product/interface/product.interface';
// Імпорт типу AppWrapperContextType для доступу до глобального стану
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для оновлення продукту за його ID
export const updateProductById = async (
  product: IProduct, // Об'єкт продукту, який потрібно оновити
  context: AppWrapperContextType // Контекст додатка для доступу до токена
): Promise<IProduct> => {
  try {
    // Отримання токена з контексту
    const token = context.token;
    // Вилучення ID продукту та інших даних, які потрібно оновити
    const { uid, categories, images, ...updateData } = product;

    // Виконання POST-запиту для оновлення продукту за його ID
    const response = await axios.post(
      `${getConfig('apiUrl')}/product/${uid}`, // Кінцева точка API для оновлення продукту
      {
        ...updateData, // Дані, які потрібно оновити
        categoryIds: categories.map(category => category.uid), // ID категорій продукту
        imgIds: images.map(image => image.uid), // ID зображень продукту
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Включення токена в заголовок авторизації
        },
      }
    );

    // Повернення оновлених даних продукту
    return response.data;
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка під час отримання продукту:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
