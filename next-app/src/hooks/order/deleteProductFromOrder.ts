import axios from 'axios'; // Імпорт axios для здійснення HTTP-запитів

import { getConfig } from '../../../config/config'; // Імпорт функції getConfig для отримання конфігурації

import { isTokenValid } from '@/hooks/util/token.util'; // Імпорт функції isTokenValid для перевірки валідності токену
import { AppWrapperContextType } from '@/pages/_appWrapper';

/**
 * Функція для видалення продукту з замовлення.
 * @param {string} uid - Унікальний ідентифікатор продукту.
 * @param {AppWrapperContextType} context - Контекст додатку, що містить стан додатку та методи для його оновлення.
 * @returns {Promise<void>} - Обіцянка без повернення значення.
 */
export const deleteProductFromOrder = async (
  uid: string,
  context: AppWrapperContextType
): Promise<void> => {
  try {
    // Перевірка валідності токену
    if (isTokenValid(context)) {
      const token = context.token;

      // Відправка DELETE-запиту на сервер для видалення продукту з замовлення
      await axios.delete(`${getConfig('apiUrl')}/order/${uid}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Додає токен авторизації до заголовків запиту
        },
      });
    } else {
      // Якщо токен не валідний, видаляємо продукт з локального сховища
      const updatedOrderItems = context.localProductsOrder.filter(
        (p: { uid: string }) => p.uid !== uid
      );

      // Оновлення стану контексту з новим списком локальних продуктів
      if (context.setState) {
        context.setState({
          ...context,
          localProductsOrder: updatedOrderItems,
        });
      }
    }

    return;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Викидаємо помилку для подальшої обробки в компоненті
  }
};

