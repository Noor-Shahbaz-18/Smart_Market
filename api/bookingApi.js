import client from './client';

export const bookingApi = {
  create: (data) => client.post('/bookings', data),
  getMy: (params) => client.get('/bookings/my', { params }),
  getOne: (id) => client.get(`/bookings/${id}`),
  updateStatus: (id, status) => client.patch(`/bookings/${id}/status`, { status }),
};