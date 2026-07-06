import client from './client';

export const userApi = {
  getProfile: (id) => client.get(`/users/${id}`),
  updateProfile: (data) => client.put('/users/profile', data),
  changePassword: (data) => client.put('/users/change-password', data),
  getMyListings: () => client.get('/users/my-listings'),
};