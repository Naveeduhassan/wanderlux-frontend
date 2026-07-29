import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://wanderlux-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable automatic sending & receiving of HTTP-Only Auth Cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token to Authorization headers if available in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch 401/403 unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        toast.error('Session expired or access denied. Please log in again.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
