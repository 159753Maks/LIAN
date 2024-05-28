// Імпортуємо бібліотеку Axios для виконання запитів HTTP
import axios from 'axios';

// Імпортуємо функцію getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпортуємо інтерфейс IProduct для типізації продукту
import { IProduct } from '@/hooks/product/interface/product.interface';
// Імпортуємо тип контексту додатку для доступу до глобального стану
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Інтерфейс для фільтрації списку продуктів
export interface ProductListFilter {
  title?: string; // Назва продукту
  description?: string; // Опис продукту
  minCost?: number; // Мінімальна ціна продукту
  maxCost?: number; // Максимальна ціна продукту
  minCount?: number; // Мінімальна кількість продукту
  maxCount?: number; // Максимальна кількість продукту
  limit?: number; // Ліміт продуктів на сторінку
  offset?: number; // Зміщення для пагінації
  asc?: boolean; // Сортування в порядку зростання
  sortField?: string; // Поле для сортування
  categoryIds?: Array<string> | string; // Ідентифікатори категорій
  orderId?: string; // Ідентифікатор замовлення
}

// Функція для отримання списку продуктів з можливістю фільтрації
export const getProductsList = async (
  filter: ProductListFilter, // Об'єкт фільтрації
  context: AppWrapperContextType // Контекст додатку для доступу до токену
): Promise<Array<IProduct>> => {
  try {
    // Отримуємо токен із контексту додатку
    const token = context.token;

    // Розділяємо категорійний ідентифікатор на масив строк або строку
    const { categoryIds, ...otherParams } = filter;

    // Параметри запиту для передачі на сервер
    const params: ProductListFilter = { ...otherParams };
    if (Array.isArray(categoryIds)) {
      // Якщо категорійний ідентифікатор - масив, конвертуємо його у JSON строку
      params.categoryIds = JSON.stringify(categoryIds);
    }

    // Виконуємо запит GET на сервер для отримання списку продуктів
    const response = await axios.get(`${getConfig('apiUrl')}/product`, {
      params, // Параметри запиту
      headers: {
        Authorization: token ? `Bearer ${token}` : null, // Включаємо токен у заголовок Authorization
      },
    });

    // Повертаємо дані отриманого списку продуктів
    return response.data;
  } catch (error) {
    // Виводимо помилку у консоль у разі її виникнення
    console.error('Error fetching product:', error);
    // Передаємо помилку далі для обробки в компоненті
    throw error;
  }
};
