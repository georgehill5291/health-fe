import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="app-left">
        <Link to="/patients" className="app-logo">Healthcare</Link>
      </div>
      <div className="app-right">
        {user ? (
          <>
            <span className="username">Hi, {user.name || user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Sign in</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

