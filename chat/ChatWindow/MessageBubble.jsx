import React from 'react';
import { formatTime } from '../../../utils/formatDate';
import styles from './MessageBubble.module.css';

const MessageBubble = ({ message, isOwn }) => {
  const { content, image, createdAt, isRead } = message;

  return (
    <div className={`${styles.wrapper} ${isOwn ? styles.own : styles.other}`}>
      <div className={`${styles.bubble} ${isOwn ? styles.ownBubble : styles.otherBubble}`}>
        {image && (
          <img
            src={image}
            alt="shared"
            className={styles.sharedImage}
            onClick={() => window.open(image, '_blank')}
          />
        )}
        {content && <p className={styles.content}>{content}</p>}

        <div className={styles.meta}>
          <span className={styles.time}>{formatTime(createdAt)}</span>
          {isOwn && (
            <span className={styles.readStatus}>
              {isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;