import React from 'react';
import { useNotification } from '../../../hooks/useNotification';
import { notificationApi } from '../../../api/notificationApi';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const { notifications, markRead } = useNotification();

  const handleMarkAll = async () => {
    await notificationApi.markAllRead();
    notifications.forEach((n) => markRead(n._id));
  };

  if (notifications.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
        <p style={{ fontSize: '1.1rem' }}>🔕 No notifications yet</p>
        <small>You'll see booking updates, messages, and reviews here</small>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
      }}>
        <button
          onClick={handleMarkAll}
          style={{
            background: 'none',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          ✓ Mark all as read
        </button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {notifications.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;