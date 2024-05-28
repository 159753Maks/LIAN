import HeaderComponent from '@/components/generic/header.component';
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Add your login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <HeaderComponent />
      <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold">Вхід до облікового запису</h1>
        <form onSubmit={handleLogin}>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Ім'я користувача"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Вхід
          </button>
        </form>
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

export default LoginPage;
