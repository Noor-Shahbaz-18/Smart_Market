import client from './client';

export const favoriteApi = {
  getAll: () => client.get('/favorites'),
  add: (data) => client.post('/favorites', data),
  remove: (targetId) => client.delete(`/favorites/${targetId}`),
};