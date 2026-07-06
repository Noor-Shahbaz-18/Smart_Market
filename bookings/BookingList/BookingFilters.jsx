import React from 'react';
import styles from './BookingFilters.module.css';

const BookingFilters = ({ role, status, onRoleChange, onStatusChange }) => {
  const statuses = ['all', 'pending', 'accepted', 'rejected', 'completed', 'cancelled'];

  return (
    <div className={styles.filters}>
      <div className={styles.roleToggle}>
        <button
          className={`${styles.roleBtn} ${role === 'client' ? styles.active : ''}`}
          onClick={() => onRoleChange('client')}
        >
          My Requests
        </button>
        <button
          className={`${styles.roleBtn} ${role === 'provider' ? styles.active : ''}`}
          onClick={() => onRoleChange('provider')}
        >
          Received Requests
        </button>
      </div>

      <div className={styles.statusFilter}>
        {statuses.map((s) => (
          <button
            key={s}
            className={`${styles.statusBtn} ${status === s ? styles.activeStatus : ''}`}
            onClick={() => onStatusChange(s === 'all' ? '' : s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingFilters;