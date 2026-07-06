import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuickActions.module.css';

const actions = [
  { label: 'Post Product', icon: '📦', path: '/create-listing?type=product', color: '#2563eb' },
  { label: 'Offer Service', icon: '🛠️', path: '/create-listing?type=service', color: '#10b981' },
  { label: 'My Bookings', icon: '📅', path: '/bookings', color: '#f59e0b' },
  { label: 'Messages', icon: '💬', path: '/messages', color: '#8b5cf6' },
  { label: 'Browse Products', icon: '🛒', path: '/products', color: '#06b6d4' },
  { label: 'Browse Services', icon: '🔍', path: '/services', color: '#ef4444' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Quick Actions</h2>
      <div className={styles.grid}>
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className={styles.card}
            style={{ borderColor: action.color }}
          >
            <span className={styles.icon}>{action.icon}</span>
            <span className={styles.label}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;