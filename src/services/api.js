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

function flattenErrorPayload(payload) {
  // payload may contain { errors: { field: ["msg"] } } or { ModelState: {...} } or { errors: [..] }
  if (!payload) return null;
  // If errors is an object with arrays
  if (payload.errors && typeof payload.errors === 'object' && !Array.isArray(payload.errors)) {
    const parts = [];
    Object.values(payload.errors).forEach(v => {
      if (Array.isArray(v)) parts.push(...v);
      else if (typeof v === 'string') parts.push(v);
    });
    if (parts.length) return parts.join(' ');
  }
  // If payload.errors is an array
  if (Array.isArray(payload.errors)) return payload.errors.join(' ');
  // Older style ModelState or validation dictionary
  if (payload.ModelState && typeof payload.ModelState === 'object') {
    const parts = [];
    Object.values(payload.ModelState).forEach(v => {
      if (Array.isArray(v)) parts.push(...v);
      else if (typeof v === 'string') parts.push(v);
    });
    if (parts.length) return parts.join(' ');
  }
  // If payload has a list of errors under 'details' or similar
  if (payload.detail && typeof payload.detail === 'string') return payload.detail;
  // If single message fields
  if (payload.message && typeof payload.message === 'string') return payload.message;
  if (payload.error && typeof payload.error === 'string') return payload.error;
  // If payload is a string already
  if (typeof payload === 'string') return payload;
  // Fallback: JSON stringify small payloads
  try {
    const txt = JSON.stringify(payload);
    return txt;
  } catch (e) {
    return null;
  }
}

async function parseResponse(res) {
  const text = await res.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch (e) {
    payload = text || null;
  }

  if (!res.ok) {
    const flattened = flattenErrorPayload(payload);
    const message = flattened || text || res.statusText || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

export async function fetchPatients() {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients`, { headers });
  return parseResponse(res);
}

export async function fetchPatient(id) {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, { headers });
  return parseResponse(res);
}

export async function createPatient(payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function updatePatient(id, payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function deletePatient(id) {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: 'DELETE',
    headers,
  });
  // Some APIs return empty body on delete; parseResponse will handle non-ok and return null on empty-ok
  return parseResponse(res);
}

export async function fetchAppointments() {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/appointments`, { headers });
  return parseResponse(res);
}

export async function createAppointment(payload) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}
