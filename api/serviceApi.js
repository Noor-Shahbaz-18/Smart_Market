import client from './client';

export const serviceApi = {
  getAll: (params) => client.get('/services', { params }),
  getOne: (id) => client.get(`/services/${id}`),
  create: (data) => client.post('/services', data),
  update: (id, data) => client.put(`/services/${id}`, data),
  delete: (id) => client.delete(`/services/${id}`),
};