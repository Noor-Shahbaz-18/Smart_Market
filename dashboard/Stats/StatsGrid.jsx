import React from 'react';
import StatsCard from './StatsCard';
import styles from './StatsGrid.module.css';

const StatsGrid = ({ stats }) => {
  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;