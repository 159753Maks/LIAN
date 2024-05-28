import axios from 'axios';
import { getConfig } from '../../../config/config';
import { OrderStatusEnum } from '@/hooks/order/util/order-status-enum';
import { AppWrapperContextType } from '@/pages/_appWrapper';

/**
 * Функція для оновлення статусу замовлення на сервері.
 * @param {string} uid - Ідентифікатор замовлення.
 * @param {OrderStatusEnum} status - Новий статус замовлення.
 * @returns {Promise<void>} - Обіцянка без значення.
 */
export const updateOrderStatus = async (
  uid: string,
  status: OrderStatusEnum,
  context: AppWrapperContextType
): Promise<void> => {
  try {
    const token = context.token;

    await axios.put(
      `${getConfig('apiUrl')}/order/${uid}`,
      {
        status,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : null, // Додає токен авторизації до заголовків запиту, якщо він доступний.
        },
      }
    );

    return;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Викидає помилку для подальшої обробки у вищестоячому компоненті.
  }
};
