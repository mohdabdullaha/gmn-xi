import axios from 'axios';

/**
 * Central Axios instance with base URL and default headers.
 * Uses withCredentials so the HttpOnly cookie is sent automatically —
 * the token is never readable by JavaScript.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // ← sends HttpOnly cookie on every request
});

// ── Response Interceptor ─────────────────────────────────────
// Handle 401 Unauthorized globally (token expired → redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear only non-sensitive user metadata (NOT the token — it's in a cookie)
      localStorage.removeItem('gift_admin_user');
      localStorage.removeItem('gift_admin_last_activity');
      
      // Only redirect if we are actively on an admin protected page
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.replace('/giftadmin?expired=true');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Typed API Service Methods ───────────────────────────────

export const videosApi = {
  getAll: () => api.get('/videos'),
  create: (data: { title: string; youtubeUrl: string; order?: number }) =>
    api.post('/videos', data),
  update: (id: string, data: { title: string; youtubeUrl: string; order?: number }) =>
    api.put(`/videos/${id}`, data),
  delete: (id: string) => api.delete(`/videos/${id}`),
};

export const infographicsApi = {
  getAll: () => api.get('/infographics'),
  create: (data: { title: string; desc?: string; fileUrl?: string }) =>
    api.post('/infographics', data),
  update: (id: string, data: { title: string; desc?: string; fileUrl?: string }) =>
    api.put(`/infographics/${id}`, data),
  delete: (id: string) => api.delete(`/infographics/${id}`),
};

export const inquiriesApi = {
  getAll: () => api.get('/inquiries'),
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
  markRead: (id: string) => api.put(`/inquiries/${id}`),
  delete: (id: string) => api.delete(`/inquiries/${id}`),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verify: () => api.get('/auth/verify'),
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) => 
    api.post('/auth/reset-password', data),
  changePassword: (data: { oldPassword: string; newPassword: string }) => 
    api.post('/auth/change-password', data),
};

export const uploadApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

