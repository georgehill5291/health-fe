// Auth service: call backend endpoints instead of returning hardcoded mocks.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5167/api";

function normalizeBase(base) {
  if (!base) return '';
  let b = base.replace(/\/$/, ''); // remove trailing slash
  // if base ends with '/api', remove that so we can consistently append '/api/Auth/...'
  b = b.replace(/\/api$/i, '');
  return b;
}

const AUTH_ROOT = normalizeBase(API_BASE); // will be like http://host:port

async function parseResponse(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text || { message: res.statusText }; }
}

async function tryPost(endpoint, body) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {}),
    });

    if (res.status === 404) return { status: 404 };

    const payload = await parseResponse(res);
    if (!res.ok) return { status: res.status, payload };
    return { status: res.status, payload };
  } catch (err) {
    return { error: err };
  }
}

export async function login(credentials) {
  // Call the explicit backend endpoints provided by the user: /api/Auth/login
  const endpoint = `${AUTH_ROOT}/api/Auth/login`;
  const result = await tryPost(endpoint, credentials);
  if (result.error) return { message: result.error.message || 'Network error' };
  if (result.status === 404) return { message: 'Auth login endpoint not found' };
  if (result.status >= 200 && result.status < 300) return result.payload;
  const payload = result.payload;
  return { message: (payload && payload.message) || (typeof payload === 'string' ? payload : 'Login failed') };
}

export async function register(payload) {
  const endpoint = `${AUTH_ROOT}/api/Auth/register`;
  const result = await tryPost(endpoint, payload);
  if (result.error) return { message: result.error.message || 'Network error' };
  if (result.status === 404) return { message: 'Auth register endpoint not found' };
  if (result.status >= 200 && result.status < 300) return result.payload;
  const body = result.payload;
  return { message: (body && body.message) || (typeof body === 'string' ? body : 'Registration failed') };
}

export async function ssoLogin(provider = 'google') {
  // If your backend supports SSO token exchange at /api/Auth/sso/{provider}, try that.
  const endpoint = `${AUTH_ROOT}/api/Auth/sso/${provider}`;
  const result = await tryPost(endpoint, { provider });
  if (result.error) return { message: result.error.message || 'Network error' };
  if (result.status === 404) return { message: 'SSO endpoint not found; backend may require redirect flow' };
  if (result.status >= 200 && result.status < 300) return result.payload;
  const body = result.payload;
  return { message: (body && body.message) || (typeof body === 'string' ? body : 'SSO failed') };
}
