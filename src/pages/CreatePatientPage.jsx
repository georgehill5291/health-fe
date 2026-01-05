import React, {useState} from 'react';
import { createPatient } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/patients.scss';

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

      <form onSubmit={onSubmit} className="patient-form form-table">
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th>Full name</th>
              <td><input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" /></td>
            </tr>
            <tr>
              <th>Email</th>
              <td><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" /></td>
            </tr>
            <tr>
              <td colSpan="2">
                <div className="form-actions">
                  <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
                  <Link to="/patients" className="back-link" style={{marginLeft: 8}}>Cancel</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CreatePatientPage;
