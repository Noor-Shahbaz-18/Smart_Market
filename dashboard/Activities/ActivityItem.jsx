import React from 'react';
import { timeAgo } from '../../../utils/formatDate';
import { getNotificationIcon } from '../../../utils/helpers';

const ActivityItem = ({ type, message, createdAt }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start',
      padding: '0.75rem 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: '1.2rem' }}>{getNotificationIcon(type)}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.88rem', marginBottom: '0.2rem' }}>{message}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{timeAgo(createdAt)}</p>
      </div>
    </div>
  );
};

export default ActivityItem;