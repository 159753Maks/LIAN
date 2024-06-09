import axios from 'axios';

import { getConfig } from '../../../config/config';

import { IProduct } from '@/hooks/product/interface/product.interface';
import { isTokenValid } from '@/hooks/util/token.util';
import { AppWrapperContextType } from '@/pages/_appWrapper';

/**
 * Функція для додавання продукту до замовлення.
 * @param {IProduct} product - Об'єкт, що містить дані про продукт.
 * @param {AppWrapperContextType} context - Контекст додатку, що містить стан додатку та методи для його оновлення.
 * @returns {Promise<void>} - Обіцянка без повернення значення.
 */
export const addProductToOrder = async (
  product: IProduct,
  context: AppWrapperContextType
): Promise<void> => {
  try {
    // Перевірка валідності токену
    if (isTokenValid(context)) {
      const token = context.token;

      // Відправка POST-запиту на сервер для додавання продукту до замовлення
      await axios.post(
        `${getConfig('apiUrl')}/order/${product.uid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додає токен авторизації до заголовків запиту
          },
        }
      );
    } else {
      // Якщо токен не валідний, зберігаємо продукт у локальному сховищі
      if (context.setState) {
        // Перевірка чи продукт вже є в локальному замовленні
        const existingInLocal = context.localProductsOrder.find(
          lpo => lpo.uid === product.uid
        );

        // Створення нового списку локального замовлення без обраного продукту
        const newList = context.localProductsOrder.filter(
          lpo => lpo.uid !== product.uid
        );

        // Якщо продукт вже є у локальному замовленні, збільшуємо його кількість на 1
        if (existingInLocal && existingInLocal.count) {
          existingInLocal.count += 1;
          context.setState({
            ...context,
            localProductsOrder: [...newList, existingInLocal],
          });
        } else {
          // Якщо продукту немає у локальному замовленні, додаємо його з кількістю 1
          context.setState({
            ...context,
            localProductsOrder: [...newList, { ...product, count: 1 }],
          });
        }
      }
    }

    return;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Викидаємо помилку для подальшої обробки в компоненті
  }
};

