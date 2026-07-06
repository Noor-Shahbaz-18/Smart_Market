const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// @GET /api/chat/conversations
const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name avatar')
      .populate('lastMessage')
      .sort('-lastMessageAt');

    res.json({ success: true, conversations });
  } catch (error) {
    next(error);
  }
};

// @POST /api/chat/conversations
const createOrGetConversation = async (req, res, next) => {
  try {
    const { participantId } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participantId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, participantId],
      });
    }

    await conversation.populate('participants', 'name avatar');
    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

// @GET /api/chat/conversations/:id/messages
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversation: req.params.id })
      .populate('sender', 'name avatar')
      .sort('createdAt');

    // Mark as read
    await Message.updateMany(
      { conversation: req.params.id, sender: { $ne: req.user._id }, isRead: false },
      { isRead: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

// @POST /api/chat/conversations/:id/messages
const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file.path : '';

    const message = await Message.create({
      conversation: req.params.id,
      sender: req.user._id,
      content,
      image,
    });

    await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: message._id,
      lastMessageAt: Date.now(),
    });

    await message.populate('sender', 'name avatar');
    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

module.exports = { getConversations, createOrGetConversation, getMessages, sendMessage };