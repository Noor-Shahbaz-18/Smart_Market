import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import Spinner from '../../common/Loader/Spinner';
import styles from './ServiceList.module.css';

const ServiceList = ({ services = [], loading = false }) => {
  if (loading) return <Spinner />;

  if (services.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
        <p style={{ fontSize: '1.1rem' }}>😕 No services found</p>
        <small>Try adjusting your filters or search query</small>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;