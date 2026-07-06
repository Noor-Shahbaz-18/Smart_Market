import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={`container page-padding ${styles.about}`}>
      <div className={styles.hero}>
        <h1>About SmartMarket</h1>
        <p>Connecting communities through trusted services and products.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.icon}>🎯</span>
          <h3>Our Mission</h3>
          <p>To empower local communities by providing a secure, trusted platform where people can offer services, sell products, and connect with each other.</p>
        </div>
        <div className={styles.card}>
          <span className={styles.icon}>👁️</span>
          <h3>Our Vision</h3>
          <p>To become the go-to marketplace for every community, enabling economic growth and meaningful connections at the local level.</p>
        </div>
        <div className={styles.card}>
          <span className={styles.icon}>💎</span>
          <h3>Our Values</h3>
          <p>Trust, transparency, and community are at the heart of everything we do. We believe in fair opportunities for everyone.</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}><strong>1000+</strong><span>Active Users</span></div>
        <div className={styles.stat}><strong>500+</strong><span>Services Listed</span></div>
        <div className={styles.stat}><strong>2000+</strong><span>Products Listed</span></div>
        <div className={styles.stat}><strong>98%</strong><span>Satisfaction Rate</span></div>
      </div>
    </div>
  );
};

export default About;