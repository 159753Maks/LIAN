import HeaderComponent from '@/components/generic/header.component';
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Add your login logic here
    console.log(
      `SingUp in with username: ${username}, password: ${password}, email: ${email}`
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <HeaderComponent />
      <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold">Реєстрація</h1>
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
            <input
              type="text"
              placeholder="Електронна пошта"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Зареєструватися
          </button>
        </form>
        <p className="text-sm text-center">
          Зареєстрований?{' '}
          <a href="/signin" className="text-blue-500 underline">
            Увійди до облікового запису
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
