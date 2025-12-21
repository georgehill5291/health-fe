import React from 'react';
import LoginForm from '../components/LoginForm';
import GoogleSSOButton from '../components/GoogleSSOButton';
import { useAuth } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (user) return <Navigate to={location.state?.from?.pathname || '/patients'} replace />;

  return (
    <div className="login-page">
      <h2>Sign in</h2>
      <LoginForm />
      <div className="login-or">or</div>
      <div className="sso-button">
        <GoogleSSOButton />
      </div>
    </div>
  );
};

export default LoginPage;
