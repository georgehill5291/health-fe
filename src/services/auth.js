// Real implementation would call server endpoints. For now return mocked success.
export async function login({ username, password }) {
  // basic mock validation
  await new Promise((r) => setTimeout(r, 300));
  if (!username || !password) return { message: 'Username and password required' };
  if (password !== 'password') return { message: 'Invalid credentials' };
  return {
    token: 'mock-jwt-token',
    user: { username, name: 'Demo User' },
  };
}

export async function ssoLogin(provider = 'google') {
  // Simulate redirect/consent and server exchange
  await new Promise((r) => setTimeout(r, 500));
  if (provider !== 'google') return { message: 'Unsupported provider' };
  return {
    token: 'mock-google-jwt',
    user: { username: 'google.user', name: 'Google User', provider: 'google' },
  };
}
