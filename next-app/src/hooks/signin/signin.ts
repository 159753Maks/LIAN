// Імпорт бібліотеки Axios для здійснення HTTP-запитів
import axios from 'axios';

// Імпорт функції getConfig з файлу конфігурації для отримання URL API
import { getConfig } from '../../../config/config';

// Імпорт функції getCurrentUser для отримання даних поточного користувача
import { getCurrentUser } from '@/hooks/signin/get-current-user';

// Імпорт типу контексту з AppWrapper для доступу до стану застосунку
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для входу користувача в систему
export const signin = async (
  email: string, // Email користувача
  password: string, // Пароль користувача
  context: AppWrapperContextType // Контекст застосунку
): Promise<void> => {
  try {
    // Виконання POST-запиту для входу користувача
    const response = await axios.post(`${getConfig('apiUrl')}/signin`, {
      email,
      password,
    });

    // Отримання даних про поточного користувача за допомогою отриманого токена
    const user = await getCurrentUser(response.data.token);

    // Перевірка наявності методу setState в контексті застосунку
    if (context.setState) {
      // Встановлення дати закінчення терміну дії токена
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 50);
      const expiryTime = expiryDate.toISOString();
      // Оновлення стану застосунку з даними користувача та токеном
      context.setState({
        ...context,
        user,
        token: response.data.token,
        expiryTime,
      });
    }
  } catch (error) {
    // Запис помилки до консолі у разі невдачі
    console.error('Помилка під час входу користувача:', error);
    // Переповернення помилки для обробки в компоненті
    throw error;
  }
};
