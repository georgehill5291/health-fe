import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, ssoLogin as apiSsoLogin, register as apiRegister } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // hydrate from localStorage
    const raw = localStorage.getItem('hc_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (e) {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('hc_auth', JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem('hc_auth');
    }
  }, [user, token]);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res?.token) {
      setUser(res.user || { username: credentials.username });
      setToken(res.token);
      return { ok: true };
    }
    return { ok: false, message: res?.message || 'Login failed' };
  };

  const register = async (payload) => {
    const res = await apiRegister(payload);
    if (res?.token) {
      setUser(res.user || { username: payload.username });
      setToken(res.token);
      return { ok: true };
    }
    return { ok: false, message: res?.message || 'Registration failed' };
  };

  const ssoLogin = async (provider) => {
    const res = await apiSsoLogin(provider);
    if (res?.token) {
      setUser(res.user);
      setToken(res.token);
      return { ok: true };
    }
    return { ok: false, message: res?.message || 'SSO failed' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, ssoLogin, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
