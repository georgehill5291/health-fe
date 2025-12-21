import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPatient, updatePatient } from '../services/api';
import '../styles/patients.css';

const EditPatientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const p = await fetchPatient(id);
      setFullName(p.fullName || '');
      setEmail(p.email || '');
      setPhone(p.phone || '');
    } catch (e) {
      setError(e?.message || 'Failed to load patient');
    } finally {
      setLoading(false);
    }
  }

  function isValidEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function onSave(e) {
    e.preventDefault();
    setError(null);
    if (!fullName) return setError('Full name is required');
    if (!email) return setError('Email is required');
    if (!isValidEmail(email)) return setError('Email is invalid');
    if (!phone) return setError('Phone is required');

    setSaving(true);
    try {
      await updatePatient(id, { fullName, email, phone });
      navigate('/patients');
    } catch (e) {
      setError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="patients-panel">
      <h2>Edit patient</h2>
      <form onSubmit={onSave} className="patient-form">
        <label>
          Full name
          <input value={fullName} onChange={e => setFullName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Phone
          <input value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => navigate('/patients')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientPage;
