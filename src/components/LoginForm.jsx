import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/login.css';

const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    setLoading(true);
    const res = await login({ username, password });
    setLoading(false);
    if (!res.ok) setError(res.message || 'Login failed');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  );
};

export default LoginForm;
