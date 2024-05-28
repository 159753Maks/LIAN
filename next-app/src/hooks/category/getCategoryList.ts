import axios from 'axios'; // Імпортуємо бібліотеку axios для виконання HTTP-запитів

import { getConfig } from '../../../config/config'; // Імпортуємо функцію для отримання конфігурації

import { ICategory } from '@/hooks/category/interface/category.interface'; // Імпортуємо інтерфейс категорії

// Функція для отримання списку категорій
export const getCategoryList = async (): Promise<Array<ICategory>> => {
  try {
    // Виконуємо GET-запит до API для отримання списку категорій
    const response = await axios.get(`${getConfig('apiUrl')}/category`);

    // Повертаємо дані, отримані від сервера
    return response.data;
  } catch (error) {
    // У випадку помилки виводимо повідомлення про помилку у консоль
    console.error('Error fetching product:', error);
    // Переходимо до обробки помилки у компоненті
    throw error;
  }
};