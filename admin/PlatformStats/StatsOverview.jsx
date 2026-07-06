import React from 'react';
import styles from './StatsOverview.module.css';

const StatsOverview = ({ stats }) => {
  const items = [
    { label: 'Total Users', value: stats?.users, icon: '👥', bg: '#eff6ff', color: '#2563eb' },
    { label: 'Total Products', value: stats?.products, icon: '📦', bg: '#f0fdf4', color: '#16a34a' },
    { label: 'Total Services', value: stats?.services, icon: '🛠️', bg: '#fefce8', color: '#ca8a04' },
    { label: 'Total Bookings', value: stats?.bookings, icon: '📅', bg: '#faf5ff', color: '#9333ea' },
    { label: 'Pending Products', value: stats?.pendingProducts, icon: '⏳', bg: '#fff1f2', color: '#e11d48' },
    { label: 'Pending Services', value: stats?.pendingServices, icon: '⏳', bg: '#fff7ed', color: '#ea580c' },
  ];

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div
          key={item.label}
          className={styles.card}
          style={{ background: item.bg, borderLeft: `4px solid ${item.color}` }}
        >
          <span className={styles.icon}>{item.icon}</span>
          <div>
            <p className={styles.value} style={{ color: item.color }}>{item.value ?? 0}</p>
            <p className={styles.label}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;