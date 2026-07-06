import React from 'react';
import styles from './TypingIndicator.module.css';

const TypingIndicator = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bubble}>
        <span className={styles.name}>{name} is typing</span>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;