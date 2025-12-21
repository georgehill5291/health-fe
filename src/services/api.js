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

export async function fetchPatient(id) {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, { headers });
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

export async function updatePatient(id, payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });
  return res;
}

export async function deletePatient(id) {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: 'DELETE',
    headers,
  });
  // Some APIs return empty body on delete; try to parse safely
  try {
    return await res.json();
  } catch (e) {
    return { ok: res.ok };
  }
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
