import React from 'react';
import styles from './ActivityLog.module.css';

const ActivityLog = ({ stats }) => {
  const activities = [
    { icon: '👥', label: 'Total registered users', value: stats?.users },
    { icon: '📦', label: 'Total products listed', value: stats?.products },
    { icon: '🛠️', label: 'Total services offered', value: stats?.services },
    { icon: '📅', label: 'Total bookings made', value: stats?.bookings },
    { icon: '⏳', label: 'Products awaiting approval', value: stats?.pendingProducts },
    { icon: '⏳', label: 'Services awaiting approval', value: stats?.pendingServices },
  ];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Platform Summary</h3>
      <div className={styles.list}>
        {activities.map((a) => (
          <div key={a.label} className={styles.item}>
            <span className={styles.icon}>{a.icon}</span>
            <span className={styles.label}>{a.label}</span>
            <span className={styles.value}>{a.value ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;