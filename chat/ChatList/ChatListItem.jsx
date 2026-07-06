import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getAvatar } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import { truncate } from '../../../utils/formatters';
import styles from './ChatListItem.module.css';

const ChatListItem = ({ conversation, isSelected, onClick }) => {
  const { user } = useAuth();

  const otherParticipant = conversation.participants?.find(
    (p) => p._id !== user?._id
  );

  const lastMsg = conversation.lastMessage;

  return (
    <div
      onClick={onClick}
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
    >
      <img
        src={getAvatar(otherParticipant?.avatar, otherParticipant?.name)}
        alt={otherParticipant?.name}
        className={styles.avatar}
      />

      <div className={styles.info}>
        <div className={styles.topRow}>
          <p className={styles.name}>{otherParticipant?.name || 'Unknown'}</p>
          {lastMsg && (
            <span className={styles.time}>{timeAgo(conversation.lastMessageAt)}</span>
          )}
        </div>
        <p className={styles.lastMsg}>
          {lastMsg
            ? truncate(lastMsg.content || '📷 Image', 45)
            : 'No messages yet'}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;