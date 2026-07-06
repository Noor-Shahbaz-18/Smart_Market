import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import StatsOverview from './StatsOverview';
import Spinner from '../../common/Loader/Spinner';

const PlatformStats = () => {
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
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Platform Statistics
      </h1>
      <StatsOverview stats={stats} />
    </div>
  );
};

export default PlatformStats;