import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.btn}>← Go Back Home</Link>
      </div>
    </div>
  );
};

export default NotFound;