import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { chatApi } from '../../api/chatApi';
import ChatList from '../../components/chat/ChatList/ChatList';
import ChatWindow from '../../components/chat/ChatWindow/ChatWindow';
import styles from './Messages.module.css';

const Messages = () => {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    // Auto select conversation if navigated from product/service page
    if (location.state?.conversationId && conversations.length > 0) {
      const conv = conversations.find(
        (c) => c._id === location.state.conversationId
      );
      if (conv) setSelectedConversation(conv);
    }
  }, [conversations, location.state]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await chatApi.getConversations();
      setConversations(res.data.conversations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* Left: Conversation List */}
        <div className={`${styles.sidebar} ${selectedConversation ? styles.hideMobile : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2>Messages</h2>
          </div>
          <ChatList
            conversations={conversations}
            loading={loading}
            selectedId={selectedConversation?._id}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Right: Chat Window */}
        <div className={`${styles.chatArea} ${!selectedConversation ? styles.hideMobile : ''}`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              onBack={() => setSelectedConversation(null)}
            />
          ) : (
            <div className={styles.noChatSelected}>
              <span>💬</span>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;