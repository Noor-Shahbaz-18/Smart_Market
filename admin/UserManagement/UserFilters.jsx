import React from 'react';
import styles from './UserFilters.module.css';

const UserFilters = ({ search, onSearch }) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="🔍 Search by name or email..."
        className={styles.input}
      />
    </div>
  );
};

export default UserFilters;