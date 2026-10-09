import React, { useState } from 'react';
import './styles/global.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

function App() {
  const { isAuthenticated, user, login, register, logout, loading } = useAuth();
  const [view, setView] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    const handleSwitch = () => setView('register');
    window.addEventListener('switch-to-register', handleSwitch);
    return () => window.removeEventListener('switch-to-register', handleSwitch);
  }, []);

  if (loading) {
    return (
      <div className="flex-center h-screen bg-dark">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        {view === 'login' ? (
          <LoginPage onLogin={login} />
        ) : (
          <RegisterPage
            onRegister={register}
            onSwitchToLogin={() => setView('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard onLogout={logout} user={user} />
    </div>
  );
}

export default App;
