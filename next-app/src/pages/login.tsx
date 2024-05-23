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
      <div className="p-6 space-y-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Not registered?{' '}
          <a href="#" className="text-blue-500 underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
