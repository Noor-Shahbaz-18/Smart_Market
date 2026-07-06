import React from 'react';
import styles from './StatsCard.module.css';

const StatsCard = ({ label, value, icon, color }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ background: `${color}20` }}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.info}>
        <p className={styles.value} style={{ color }}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;