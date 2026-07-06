const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const chatHandler = (io, socket) => {
  // Join conversation room
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
  });

  // Leave conversation room
  socket.on('leave_conversation', (conversationId) => {
    socket.leave(conversationId);
  });

  // Send message via socket
  socket.on('send_message', async (data) => {
    try {
      const { conversationId, senderId, content, image } = data;

      const message = await Message.create({
        conversation: conversationId,
        sender: senderId,
        content,
        image: image || '',
      });

      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id,
        lastMessageAt: Date.now(),
      });

      await message.populate('sender', 'name avatar');

      // Emit to everyone in the conversation room
      io.to(conversationId).emit('receive_message', message);
    } catch (error) {
      socket.emit('error', { message: 'Message failed to send' });
    }
  });

  // Mark messages as read
  socket.on('mark_read', async ({ conversationId, userId }) => {
    try {
      await Message.updateMany(
        { conversation: conversationId, sender: { $ne: userId }, isRead: false },
        { isRead: true }
      );
      io.to(conversationId).emit('messages_read', { conversationId, userId });
    } catch (error) {
      console.error('Mark read error:', error);
    }
  });
};

module.exports = { chatHandler };