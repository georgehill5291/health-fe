import React, { useEffect, useState } from "react";
import { fetchAppointments, fetchPatients, createAppointment } from "../services/api";
import '../styles/appointments.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [startUtc, setStartUtc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const appts = await fetchAppointments();
      const pats = await fetchPatients();
      setAppointments(appts);
      setPatients(pats);
    } catch (err) {
      setError(err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(e) {
    e.preventDefault();
    if (!patientId || !startUtc) return;
    const dt = new Date(startUtc);
    if (isNaN(dt.getTime())) return setError('Invalid date');
    const isoUtc = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString();
    await createAppointment({ patientId: Number(patientId), startUtc: isoUtc, durationMinutes: 30 });
    setStartUtc("");
    setPatientId("");
    load();
  }

  // Normalize shapes to arrays
  const apptList = Array.isArray(appointments)
    ? appointments
    : (appointments && Array.isArray(appointments.$values))
      ? appointments.$values
      : [];

  const patientList = Array.isArray(patients)
    ? patients
    : (patients && Array.isArray(patients.$values))
      ? patients.$values
      : [];

  return (
    <div className="appointments-panel">
      <h2>Appointments</h2>

      {error && <div className="appointment-error">{error}</div>}

      <form onSubmit={onCreate} className="appointment-form">
        <select value={patientId} onChange={e => setPatientId(e.target.value)}>
          <option value="">Select patient</option>
          {patientList.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </select>
        <input value={startUtc} onChange={e => setStartUtc(e.target.value)} placeholder="Local start e.g. 2025-06-01T09:00" />
        <button type="submit" disabled={loading}>Create</button>
      </form>

      {loading ? (
        <div className="appointment-loading">Loading...</div>
      ) : (
        <ul className="appointments-list">
          {apptList.map(a => (
            <li key={a.id}>
              <div>
                <div>{a.patient?.fullName ?? a.patientId}</div>
                <div className="appointment-meta">{(a.startUtc ? new Date(a.startUtc).toLocaleString() : '')} · {a.durationMinutes} mins</div>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
