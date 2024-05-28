// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Функція для отримання даних поточного користувача
export const getCurrentUser = async (
  token: string // Токен користувача
): Promise<{ userId: string; role: string }> => {
  try {
    // Виконання GET-запиту для отримання даних поточного користувача
    const response = await axios.get(`${getConfig('apiUrl')}/user`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null, // Включення токена в заголовок авторизації
      },
    });

    // Повернення отриманих даних про користувача
    return response.data;
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка отримання даних користувача:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
