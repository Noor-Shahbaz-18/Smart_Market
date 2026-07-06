import client from './client';

export const adminApi = {
  getStats: () => client.get('/admin/stats'),
  getUsers: (params) => client.get('/admin/users', { params }),
  toggleSuspend: (id) => client.patch(`/admin/users/${id}/suspend`),
  getPendingListings: () => client.get('/admin/listings/pending'),
  approveListing: (type, id, action) => client.patch(`/admin/listings/${type}/${id}/approve`, { action }),
  getReports: () => client.get('/admin/reports'),
  updateReport: (id, status) => client.patch(`/admin/reports/${id}`, { status }),
};