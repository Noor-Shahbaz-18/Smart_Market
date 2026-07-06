import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import styles from './Home.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <h1 className={styles.heroTitle}>
          Your Smart Community <span>Marketplace</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Discover trusted services, buy & sell products, and connect with local experts in your community.
        </p>
        <div className={styles.heroSearch}>
          <SearchBar placeholder="Search products, services..." />
        </div>
        <div className={styles.heroBtns}>
          <Link to="/services" className={styles.btnPrimary}>Browse Services</Link>
          <Link to="/products" className={styles.btnOutline}>Browse Products</Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}><strong>500+</strong><span>Services</span></div>
          <div className={styles.stat}><strong>1000+</strong><span>Products</span></div>
          <div className={styles.stat}><strong>200+</strong><span>Sellers</span></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;