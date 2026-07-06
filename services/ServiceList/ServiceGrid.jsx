import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import styles from './ServiceList.module.css';

const ServiceGrid = ({ services = [] }) => {
  return (
    <div className={styles.grid}>
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;