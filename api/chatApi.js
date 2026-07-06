import client from './client';

export const chatApi = {
  getConversations: () => client.get('/chat/conversations'),
  createOrGet: (participantId) => client.post('/chat/conversations', { participantId }),
  getMessages: (id) => client.get(`/chat/conversations/${id}/messages`),
  sendMessage: (id, data) => client.post(`/chat/conversations/${id}/messages`, data),
};