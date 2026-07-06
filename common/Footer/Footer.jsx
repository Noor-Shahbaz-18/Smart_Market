import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <h3>Smart<span>Market</span></h3>
          <p>Your trusted community marketplace for services and products.</p>
        </div>

        <div className={styles.links}>
          <h4>Marketplace</h4>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/create-listing">Post Listing</Link>
        </div>

        <div className={styles.links}>
          <h4>Account</h4>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/messages">Messages</Link>
        </div>

        <div className={styles.links}>
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} SmartMarket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;