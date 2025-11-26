// Lightweight API client used by server routes (register/login/profile)
const BASE_URL = process.env.BACKEND_API_URL || 'https://safe-ummah-server.vercel.app';

async function safeFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  try {
    const res = await fetch(url, options);
    const json = await res.json().catch(() => ({}));
    return { status: res.status, ok: res.ok, data: json };
  } catch (error) {
    return { status: 0, ok: false, error: error.message || String(error) };
  }
}

export const apiClient = {
  async register(payload) {
    const body = JSON.stringify(payload);
    const result = await safeFetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (!result.ok) return { success: false, message: result.data?.message || result.error || 'Registration failed', status: result.status };
    return { success: true, user: result.data.user || result.data, message: result.data.message };
  },

  async login(payload) {
    const body = JSON.stringify(payload);
    const result = await safeFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (!result.ok) return { success: false, message: result.data?.message || result.error || 'Login failed', status: result.status };
    return { success: true, user: result.data.user || result.data, message: result.data.message, token: result.data.token };
  },

  async getProfile(id) {
    if (!id) return { success: false, message: 'Missing user id' };
    const result = await safeFetch(`/api/auth/profile/${id}`, { method: 'GET' });
    if (!result.ok) return { success: false, message: result.data?.message || result.error || 'Failed to fetch profile', status: result.status };
    return { success: true, user: result.data.user || result.data };
  },

  async getAllUsers() {
    const result = await safeFetch('/api/auth/profile/', { method: 'GET' });
    if (!result.ok) return { success: false, message: result.data?.message || result.error || 'Failed to fetch users', status: result.status };
    return { success: true, users: result.data.user || result.data.users || result.data };
  },

  async createUser(payload) {
    // payload should contain name, email, password, image (optional)
    const result = await safeFetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!result.ok) return { success: false, message: result.data?.message || result.error || 'Failed to create user', status: result.status };
    return { success: true, user: result.data.user || result.data };
  }
};

export default apiClient;