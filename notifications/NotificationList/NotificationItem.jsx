import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationApi } from '../../../api/notificationApi';
import { useNotification } from '../../../hooks/useNotification';
import { getNotificationIcon } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import styles from './NotificationItem.module.css';

const NotificationItem = ({ notification }) => {
  const { markRead } = useNotification();
  const navigate = useNavigate();
  const { _id, type, message, isRead, link, createdAt } = notification;

  const handleClick = async () => {
    if (!isRead) {
      await notificationApi.markRead(_id);
      markRead(_id);
    }
    if (link) navigate(link);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await notificationApi.delete(_id);
      markRead(_id); // removes from list via context update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.item} ${!isRead ? styles.unread : ''}`}
    >
      {/* Icon */}
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{getNotificationIcon(type)}</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <p className={styles.time}>{timeAgo(createdAt)}</p>
      </div>

      {/* Right side */}
      <div className={styles.right}>
        {!isRead && <div className={styles.dot} />}
        <button
          onClick={handleDelete}
          className={styles.deleteBtn}
          title="Delete notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;