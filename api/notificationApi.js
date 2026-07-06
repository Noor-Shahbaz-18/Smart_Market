import client from './client';

export const notificationApi = {
  getAll: () => client.get('/notifications'),
  markRead: (id) => client.patch(`/notifications/${id}/read`),
  markAllRead: () => client.patch('/notifications/read-all'),
  delete: (id) => client.delete(`/notifications/${id}`),
};