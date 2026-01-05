import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/leftnav.scss';

const LeftNav = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <nav className={`leftnav ${collapsed ? 'collapsed' : ''}`} aria-label="Main navigation">
      <button className="toggle-btn" aria-pressed={collapsed} onClick={() => setCollapsed(s => !s)}>
        {collapsed ? '»' : '«'}
      </button>
      <div className="nav-items">
        <NavLink to="/patients" className={({isActive}) => 'nav-item' + (isActive ? ' active' : '')}>
          <span className="icon">👥</span>
          <span className="label">Patients</span>
        </NavLink>

        <NavLink to="/appointments" className={({isActive}) => 'nav-item' + (isActive ? ' active' : '')}>
          <span className="icon">📅</span>
          <span className="label">Appointments</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default LeftNav;
