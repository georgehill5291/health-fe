const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5167/api";

function getAuthHeaders() {
  try {
    const raw = localStorage.getItem('hc_auth');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed?.token) {
      return { Authorization: `Bearer ${parsed.token}` };
    }
  } catch (e) {
    // ignore
  }
  return {};
}

export async function fetchPatients() {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients`, { headers });
  return res.json();
}

export async function createPatient(payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchAppointments() {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/appointments`, { headers });
  return res.json();
}

export async function createAppointment(payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return res.json();
}
