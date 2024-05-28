// Імпортуємо бібліотеку axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпортуємо функцію getConfig для отримання конфігураційних налаштувань
import { getConfig } from '../../../config/config';

// Імпортуємо інтерфейс IProduct для типізації даних продуктів
import { IProduct } from '@/hooks/product/interface/product.interface';
// Імпортуємо тип AppWrapperContextType для використання контексту додатка
import { AppWrapperContextType } from '@/pages/_appWrapper';

/**
 * Функція для створення нового продукту.
 * @param {IProduct} product - Об'єкт продукту, який потрібно створити.
 * @param {AppWrapperContextType} context - Контекст додатка, який містить токен та стан.
 * @returns {Promise<IProduct>} - Обіцянка, яка повертає створений продукт.
 */
export const createProduct = async (
  product: IProduct,
  context: AppWrapperContextType
): Promise<IProduct> => {
  try {
    // Отримання токену з контексту
    const token = context.token;

    // Відправка POST-запиту на сервер для створення нового продукту
    const response = await axios.post(
      `${getConfig('apiUrl')}/product`,
      {
        title: product.title, // Назва продукту
        description: product.description, // Опис продукту
        subDescription: product.subDescription, // Додатковий опис продукту
        cost: product.cost, // Вартість продукту
        count: 10, // Кількість продукту
        categoryIds: product.categories.map(category => category.uid), // Ідентифікатори категорій продукту
        imgIds: product.images?.length
          ? product.images.map(image => image.uid) // Ідентифікатори зображень продукту, якщо вони є
          : undefined,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Додає токен авторизації до заголовків запиту, якщо токен надано
        },
      }
    );

    // Повертає дані створеного продукту, отримані від сервера
    return response.data;
  } catch (error) {
    // Виводить помилку в консоль, якщо запит не вдався
    console.error('Error fetching product:', error);
    throw error; // Викидаємо помилку для подальшої обробки в компоненті
  }
};