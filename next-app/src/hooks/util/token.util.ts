// Імпорт типу контексту з AppWrapper для доступу до стану застосунку
import { AppWrapperContextType } from '@/pages/_appWrapper';

// Функція для перевірки дійсності токену
export const isTokenValid = (context: AppWrapperContextType) => {
  // Спроба виконати перевірку
  try {
    // Отримання токену, часу закінчення та даних користувача з контексту
    const token = context.token; // Токен
    const expiryTime = context.expiryTime; // Час закінчення токену
    const user = context.user; // Дані користувача

    // Якщо відсутній токен, час закінчення або дані користувача, повернути false
    if (!token || !expiryTime || !user) {
      return false;
    }

    // Поточний час
    const now = new Date().toISOString();
    // Якщо поточний час більший за час закінчення та роль користувача не USER, повернути false
    if (now > expiryTime && user.role !== 'USER') {
      return false;
    }

    // Якщо жодна з вищезазначених умов не виконується, токен вважається дійсним
    return true;
  } catch {
    // У разі помилки повернути false
    return false;
  }
};
