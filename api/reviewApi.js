import client from './client';

export const reviewApi = {
  create: (data) => client.post('/reviews', data),
  getAll: (targetType, targetId) => client.get(`/reviews/${targetType}/${targetId}`),
  delete: (id) => client.delete(`/reviews/${id}`),
  report: (id) => client.patch(`/reviews/${id}/report`),
};