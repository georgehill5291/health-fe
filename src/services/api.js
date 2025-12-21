const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5167/api";

export async function fetchPatients() {
  const res = await fetch(`${API_BASE}/patients`);
  return res.json();
}

export async function createPatient(payload) {
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/appointments`);
  return res.json();
}

export async function createAppointment(payload) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
