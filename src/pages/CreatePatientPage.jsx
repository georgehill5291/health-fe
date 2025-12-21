import React, {useState} from 'react';
import { createPatient } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/patients.css';

const CreatePatientPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function isValidEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!fullName) return setError('Full name is required');
    if (!email) return setError('Email is required');
    if (!isValidEmail(email)) return setError('Email is invalid');
    if (!phone) return setError('Phone is required');

    setLoading(true);
    try {
      await createPatient({ fullName, email, phone });
      navigate('/patients');
    } catch (err) {
      setError(err?.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="patients-panel create-patient-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
        <h2 style={{margin: 0}}>Create patient</h2>
        <Link to="/patients" className="back-link">Back to list</Link>
      </div>

      <form onSubmit={onSubmit} className="patient-form">
        <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CreatePatientPage;
