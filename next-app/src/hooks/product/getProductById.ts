// Імпортуємо бібліотеку Axios для виконання запитів HTTP
import axios from 'axios';

// Імпортуємо функцію getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпортуємо інтерфейс IProduct для типізації продукту
import { IProduct } from '@/hooks/product/interface/product.interface';
// Імпортуємо тип контексту додатку для доступу до глобального стану
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для отримання продукту за його ідентифікатором
export const getProductById = async (
  productId: string, // Ідентифікатор продукту, який потрібно отримати
  context: AppWrapperContextType // Контекст додатку для доступу до токену
): Promise<IProduct> => {
  try {
    // Отримуємо токен із контексту додатку
    const token = context.token;

    // Виконуємо запит GET на сервер для отримання продукту за його ідентифікатором
    const response = await axios.get(
      `${getConfig('apiUrl')}/product/${productId}`, // URL API для отримання продукту
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Включаємо токен у заголовок Authorization
        },
      }
    );

    // Повертаємо дані отриманого продукту
    return response.data;
  } catch (error) {
    // Виводимо помилку у консоль у разі її виникнення
    console.error('Error fetching product:', error);
    // Передаємо помилку далі для обробки в компоненті
    throw error;
  }
};
