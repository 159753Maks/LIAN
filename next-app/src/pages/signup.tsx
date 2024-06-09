// Імпортуємо useRouter з бібліотеки Next.js для навігації між сторінками
import { useRouter } from 'next/router';
// Імпортуємо React та useState для створення та керування станом компоненту
import React, { useState } from 'react';

// Імпортуємо компонент HeaderComponent для відображення заголовка
import HeaderComponent from '@/components/generic/header.component';
// Імпортуємо функцію signup для реєстрації користувача
import { signup } from '@/hooks/signin/signup';
// Імпортуємо контекст додатку для доступу до глобального стану
import { useAppContext } from '@/pages/_appWrapper';
// Імпортуємо Link з бібліотеки Next.js для створення посилань на інші сторінки
import Link from 'next/link';

// Основний компонент сторінки реєстрації
const SignupPage = () => {
  // Отримуємо контекст додатку
  const context = useAppContext();
  // Використовуємо useRouter для навігації після реєстрації
  const router = useRouter();
  // Використовуємо useState для збереження введеного імені користувача
  const [firstName, setFirstName] = useState('');
  // Використовуємо useState для збереження введеного прізвища користувача
  const [lastName, setLastName] = useState('');
  // Використовуємо useState для збереження введеної електронної пошти
  const [username, setUsername] = useState('');
  // Використовуємо useState для збереження введеного паролю
  const [password, setPassword] = useState('');

  // Обробник реєстрації, який викликається при надсиланні форми
  const handleSignup = async (event: { preventDefault: () => void }) => {
    // Запобігаємо перезавантаженню сторінки при надсиланні форми
    event.preventDefault();
    try {
      // Викликаємо функцію signup для реєстрації користувача
      await signup(username, password, firstName, lastName, context);
      // Переходимо на головну сторінку після успішної реєстрації
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
        <h1 className="text-2xl font-bold">Реєстрація</h1>
        {/* Форма реєстрації */}
        <form onSubmit={handleSignup}>
          <div className="space-y-2">
            {/* Поле введення імені */}
            <input
              type="text"
              placeholder="Ім'я"
              className="w-full px-3 py-2 border rounded"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            {/* Поле введення прізвища */}
            <input
              type="text"
              placeholder="Прізвище"
              className="w-full px-3 py-2 border rounded"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            {/* Поле введення паролю */}
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* Поле введення електронної пошти */}
            <input
              type="text"
              placeholder="Електронна пошта"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          {/* Кнопка для надсилання форми */}
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Зареєструватися
          </button>
        </form>
        {/* Посилання на сторінку входу */}
        <p className="text-sm text-center">
          Зареєстрований?{' '}
          <Link href="/signin" className="text-blue-500 underline">
            Увійди до облікового запису
          </Link>
        </p>
      </div>
    </div>
  );
};

// Експортуємо компонент SignupPage як основний компонент сторінки реєстрації
export default SignupPage;
