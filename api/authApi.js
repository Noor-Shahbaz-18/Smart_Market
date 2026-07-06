import client from './client';

export const authApi = {
  register: (data) => client.post('/auth/register', data),
  login: (data) => client.post('/auth/login', data),
  getMe: () => client.get('/auth/me'),
  forgotPassword: (email) => client.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => client.post(`/auth/reset-password/${token}`, { password }),
};