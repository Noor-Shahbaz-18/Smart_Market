import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import Spinner from '../../common/Loader/Spinner';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminApi.getStats();
      setStats(res.data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  const cards = [
    { label: 'Total Users', value: stats?.users || 0, icon: '👥', color: '#2563eb' },
    { label: 'Total Products', value: stats?.products || 0, icon: '📦', color: '#10b981' },
    { label: 'Total Services', value: stats?.services || 0, icon: '🛠️', color: '#f59e0b' },
    { label: 'Total Bookings', value: stats?.bookings || 0, icon: '📅', color: '#8b5cf6' },
    { label: 'Pending Products', value: stats?.pendingProducts || 0, icon: '⏳', color: '#ef4444' },
    { label: 'Pending Services', value: stats?.pendingServices || 0, icon: '⏳', color: '#f97316' },
  ];

  return (
    <div>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Platform overview and management</p>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.label}
            className={styles.card}
            style={{ borderTop: `4px solid ${card.color}` }}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <p className={styles.cardValue} style={{ color: card.color }}>
                {card.value}
              </p>
            </div>
            <p className={styles.cardLabel}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Pending Alert */}
      {(stats?.pendingProducts > 0 || stats?.pendingServices > 0) && (
        <div className={styles.alert}>
          <span>⚠️</span>
          <p>
            You have{' '}
            <strong>{(stats?.pendingProducts || 0) + (stats?.pendingServices || 0)}</strong>{' '}
            listings pending approval. Go to{' '}
            <a href="/admin/listings" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Listings
            </a>{' '}
            to review them.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;