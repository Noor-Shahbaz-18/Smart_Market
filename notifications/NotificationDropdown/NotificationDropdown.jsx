import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../hooks/useNotification';
import { notificationApi } from '../../../api/notificationApi';
import { timeAgo } from '../../../utils/formatDate';
import { getNotificationIcon } from '../../../utils/helpers';
import styles from './NotificationDropdown.module.css';

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markRead } = useNotification();
  const navigate = useNavigate();

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      await notificationApi.markRead(notification._id);
      markRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };

  const handleMarkAll = async () => {
    await notificationApi.markAllRead();
    notifications.forEach((n) => markRead(n._id));
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <h4>Notifications</h4>
        <button onClick={handleMarkAll} className={styles.markAllBtn}>
          Mark all read
        </button>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>
            <p>🔕 No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleClick(n)}
              className={`${styles.item} ${!n.isRead ? styles.unread : ''}`}
            >
              <span className={styles.icon}>{getNotificationIcon(n.type)}</span>
              <div className={styles.content}>
                <p className={styles.message}>{n.message}</p>
                <p className={styles.time}>{timeAgo(n.createdAt)}</p>
              </div>
              {!n.isRead && <div className={styles.dot} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;