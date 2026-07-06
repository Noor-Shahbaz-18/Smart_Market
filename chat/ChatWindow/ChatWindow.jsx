import React, { useState, useEffect, useRef } from 'react';
import { chatApi } from '../../../api/chatApi';
import { useAuth } from '../../../hooks/useAuth';
import { useSocket } from '../../../hooks/useSocket';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import styles from './ChatWindow.module.css';

const ChatWindow = ({ conversation, onBack }) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  const otherParticipant = conversation.participants?.find(
    (p) => p._id !== user?._id
  );

  useEffect(() => {
    fetchMessages();
    if (socket) {
      socket.emit('join_conversation', conversation._id);
    }
    return () => {
      if (socket) socket.emit('leave_conversation', conversation._id);
    };
  }, [conversation._id]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    socket.on('user_typing', ({ userName }) => {
      setTypingUser(userName);
      setIsTyping(true);
    });

    socket.on('user_stopped_typing', () => {
      setIsTyping(false);
      setTypingUser('');
    });

    socket.on('messages_read', () => {
      setMessages((prev) =>
        prev.map((m) => ({ ...m, isRead: true }))
      );
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
      socket.off('user_stopped_typing');
      socket.off('messages_read');
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await chatApi.getMessages(conversation._id);
      setMessages(res.data.messages);
      scrollToBottom();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async (content, imageFile) => {
    if (!content.trim() && !imageFile) return;

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (imageFile) formData.append('image', imageFile);

      // Optimistic update
      const optimistic = {
        _id: Date.now(),
        conversation: conversation._id,
        sender: { _id: user._id, name: user.name, avatar: user.avatar },
        content,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimistic]);

      // Emit via socket
      socket?.emit('send_message', {
        conversationId: conversation._id,
        senderId: user._id,
        content,
      });

      // Also save via API for persistence
      await chatApi.sendMessage(conversation._id, formData);

      // Stop typing
      socket?.emit('typing_stop', {
        conversationId: conversation._id,
        userId: user._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTyping = () => {
    socket?.emit('typing_start', {
      conversationId: conversation._id,
      userId: user._id,
      userName: user.name,
    });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket?.emit('typing_stop', {
        conversationId: conversation._id,
        userId: user._id,
      });
    }, 2000);
  };

  return (
    <div className={styles.window}>
      <ChatHeader
        participant={otherParticipant}
        onBack={onBack}
      />

      <div className={styles.body}>
        <MessageList
          messages={messages}
          loading={loading}
          currentUserId={user?._id}
        />
        {isTyping && <TypingIndicator name={typingUser} />}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;