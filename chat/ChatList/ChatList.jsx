import React from 'react';
import ChatListItem from './ChatListItem';
import Spinner from '../../common/Loader/Spinner';
import styles from './ChatList.module.css';

const ChatList = ({ conversations, loading, selectedId, onSelect }) => {
  if (loading) return <Spinner />;

  if (conversations.length === 0) {
    return (
      <div className={styles.empty}>
        <p>💬 No conversations yet</p>
        <small>Start a conversation from a product or service page</small>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {conversations.map((conv) => (
        <ChatListItem
          key={conv._id}
          conversation={conv}
          isSelected={conv._id === selectedId}
          onClick={() => onSelect(conv)}
        />
      ))}
    </div>
  );
};

export default ChatList;