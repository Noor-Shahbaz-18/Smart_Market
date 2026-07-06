import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import ActivityLog from './ActivityLog';
import Spinner from '../../common/Loader/Spinner';
import styles from './ActivityMonitor.module.css';

const ActivityMonitor = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then((res) => setStats(res.data.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className={styles.header}>
        <h1>Activity Monitor</h1>
        <p>Platform activity overview</p>
      </div>

      <ActivityLog stats={stats} />
    </div>
  );
};

export default ActivityMonitor;