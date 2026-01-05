import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/login.scss';
import { useAuth } from '../contexts/AuthProvider';
import { Navigate, useLocation, Link } from 'react-router-dom';

const RegisterPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (user) return <Navigate to={location.state?.from?.pathname || '/patients'} replace />;

  return (
    <div className="login-page">
      <h2>Create an account</h2>
      <RegisterForm />
      <div style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
