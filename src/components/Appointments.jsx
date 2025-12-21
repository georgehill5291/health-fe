import React, { useEffect, useState } from "react";
import { fetchAppointments, fetchPatients, createAppointment } from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [startUtc, setStartUtc] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setAppointments(await fetchAppointments());
    setPatients(await fetchPatients());
  }

  async function onCreate(e) {
    e.preventDefault();
    const dt = new Date(startUtc);
    const isoUtc = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString();
    await createAppointment({ patientId: Number(patientId), startUtc: isoUtc, durationMinutes: 30 });
    setStartUtc("");
    setPatientId("");
    load();
  }

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={onCreate}>
        <select value={patientId} onChange={e => setPatientId(e.target.value)}>
          <option value="">Select patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
        </select>
        <input value={startUtc} onChange={e => setStartUtc(e.target.value)} placeholder="Local start e.g. 2025-06-01T09:00" />
        <button type="submit">Create</button>
      </form>

      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            {a.patient?.fullName ?? a.patientId}  {new Date(a.startUtc).toLocaleString()} ({a.durationMinutes} mins)
          </li>
        ))}
      </ul>
    </div>
  );
}
