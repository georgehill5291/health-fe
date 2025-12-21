import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/login.css';

const GoogleSSOButton = () => {
  const { ssoLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    const res = await ssoLogin('google');
    setLoading(false);
    if (!res.ok) setError(res.message || 'SSO failed');
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className="sso-btn">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default GoogleSSOButton;
