import axios from 'axios'; // Імпорт axios для здійснення HTTP-запитів

import { getConfig } from '../../../config/config'; // Імпорт функції getConfig для отримання конфігурації

import { IOrder } from '@/hooks/order/util/order.interface';; // Імпорт інтерфейсу IOrder для типізації даних

/**
 * Функція для отримання списку замовлень.
 * @param {string} [token] - Токен авторизації (опціонально).
 * @returns {Promise<Array<IOrder>>} - Обіцянка, яка повертає масив замовлень.
 */
export const listOrder = async (token?: string): Promise<Array<IOrder>> => {
  try {
    // Відправка GET-запиту на сервер для отримання списку замовлень
    const response = await axios.get(`${getConfig('apiUrl')}/order`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null, // Додає токен авторизації до заголовків запиту, якщо токен надано
      },
    });

    // Повертає дані отримані від сервера
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Викидаємо помилку для подальшої обробки в компоненті
  }
};

