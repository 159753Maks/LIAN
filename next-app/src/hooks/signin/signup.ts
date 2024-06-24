// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпорт типу контексту з AppWrapper для доступу до стану застосунку
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для реєстрації нового користувача
export const signup = async (
  email: string, // Email нового користувача
  password: string, // Пароль нового користувача
  firstName: string, // Ім'я нового користувача
  lastName: string, // Прізвище нового користувача
  context: AppWrapperContextType // Контекст застосунку
): Promise<void> => {
  try {
    // Виконання POST-запиту для реєстрації нового користувача
    await axios.post(`${getConfig('apiUrl')}/signup`, {
      email,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка під час реєстрації користувача:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
