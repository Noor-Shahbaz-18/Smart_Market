import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../../components/services/ServiceCard/ServiceCard';
import SkeletonLoader from '../../components/common/Loader/SkeletonLoader';
import styles from './Home.module.css';

const FeaturedServices = ({ services, loading }) => {
  return (
    <section className={styles.section} style={{ background: 'var(--light-gray)' }}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Services</h2>
          <Link to="/services" className={styles.viewAll}>View All →</Link>
        </div>
        {loading ? (
          <div className={styles.productGrid}>
            {Array(4).fill(0).map((_, i) => (
              <div key={i}>
                <SkeletonLoader height="200px" borderRadius="8px" />
                <SkeletonLoader height="20px" style={{ marginTop: '8px' }} />
                <SkeletonLoader height="16px" width="60%" />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.productGrid}>
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;