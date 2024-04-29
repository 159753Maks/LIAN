import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './components/login/login.form.component';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="dashboard" element={ <LoginForm onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
