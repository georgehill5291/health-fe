import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/login.scss';

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await register({ email, password, displayName, role });
    setLoading(false);
    if (!res.ok) setError(res.message || 'Registration failed');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Full name
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </label>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Role
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm password
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
};

export default RegisterForm;
