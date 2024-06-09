// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпорт функції getCurrentUser для отримання даних поточного користувача
import { getCurrentUser } from '@/hooks/signin/get-current-user';

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
    const response = await axios.post(`${getConfig('apiUrl')}/signup`, {
      email,
      password,
      firstName,
      lastName,
    });

    // Отримання даних про поточного користувача за допомогою отриманого токена
    const user = await getCurrentUser(response.data.token);

    // Перевірка наявності методу setState в контексті застосунку
    if (context.setState) {
      // Оновлення стану застосунку з даними користувача та токеном
      context.setState({
        ...context,
        user,
        token: response.data.token,
        expiryTime: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка під час реєстрації користувача:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
