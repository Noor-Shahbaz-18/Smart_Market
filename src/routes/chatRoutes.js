const express = require('express');
const router = express.Router();
const {
  getConversations, createOrGetConversation, getMessages, sendMessage
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/conversations', protect, getConversations);
router.post('/conversations', protect, createOrGetConversation);
router.get('/conversations/:id/messages', protect, getMessages);
router.post('/conversations/:id/messages', protect, upload.single('image'), sendMessage);

module.exports = router;