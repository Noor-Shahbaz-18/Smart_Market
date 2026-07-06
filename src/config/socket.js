const { Server } = require('socket.io');
const { chatHandler } = require('../socket/chatHandler');
const { notificationHandler } = require('../socket/notificationHandler');
const { typingHandler } = require('../socket/typingHandler');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    chatHandler(io, socket);
    notificationHandler(io, socket);
    typingHandler(io, socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

const getIO = () => io;

module.exports = { initSocket, getIO };