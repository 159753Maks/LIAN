// Імпортуємо useRouter з бібліотеки Next.js для навігації між сторінками
import { useRouter } from 'next/router';
// Імпортуємо React та useState для створення та керування станом компоненту
import React, { useState } from 'react';

// Імпортуємо компонент HeaderComponent для відображення заголовка
import HeaderComponent from '@/components/generic/header.component';
// Імпортуємо функцію signin для авторизації користувача
import { signin } from '@/hooks/signin/signin';
// Імпортуємо контекст додатку для доступу до глобального стану
import { useAppContext } from '@/pages/_appWrapper';

// Основний компонент сторінки входу
const SigninPage = () => {
  // Отримуємо контекст додатку
  const context = useAppContext();
  // Використовуємо useRouter для навігації після входу
  const router = useRouter();
  // Використовуємо useState для збереження введеного імені користувача
  const [username, setUsername] = useState('');
  // Використовуємо useState для збереження введеного паролю
  const [password, setPassword] = useState('');

  // Обробник входу, який викликається при надсиланні форми
  const handleLogin = async (event: { preventDefault: () => void }) => {
    // Запобігаємо перезавантаженню сторінки при надсиланні форми
    event.preventDefault();
    try {
      // Викликаємо функцію signin для авторизації користувача
      await signin(username, password, context);
      // Переходимо на головну сторінку після успішного входу
      router.push('/');
    } catch (error) {
      // Виводимо помилку в консоль у разі невдачі
      console.error('Error during sign in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {/* Відображення заголовка */}
      <HeaderComponent />
      <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold">Вхід до облікового запису</h1>
        {/* Форма входу */}
        <form onSubmit={handleLogin}>
          <div className="space-y-2">
            {/* Поле введення імені користувача */}
            <input
              type="text"
              placeholder="Ім'я користувача"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {/* Поле введення паролю */}
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {/* Кнопка для надсилання форми */}
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Вхід
          </button>
        </form>
        {/* Посилання на сторінку реєстрації */}
        <p className="text-sm text-center">
          Не зареєстрований?{' '}
          <a href="/signup" className="text-blue-500 underline">
            Створити обліковий запис
          </a>
        </p>
      </div>
    </div>
  );
};

// Експортуємо компонент SigninPage як основний компонент сторінки входу
export default SigninPage;
