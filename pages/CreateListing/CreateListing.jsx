import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CreateProduct from '../../components/Products/CreateProduct/CreateProduct';
import CreateService from '../../components/services/CreateService/CreateService';
import styles from './CreateListing.module.css';

const CreateListing = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'product';
  const [type, setType] = useState(initialType);

  return (
    <div className={`container page-padding ${styles.page}`}>
      <div className={styles.header}>
        <h1>Create New Listing</h1>
        <p>Choose what you want to post on the marketplace</p>
      </div>

      {/* Type Toggle */}
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${type === 'product' ? styles.active : ''}`}
          onClick={() => setType('product')}
        >
          📦 Post a Product
        </button>
        <button
          className={`${styles.toggleBtn} ${type === 'service' ? styles.active : ''}`}
          onClick={() => setType('service')}
        >
          🛠️ Offer a Service
        </button>
      </div>

      {/* Form */}
      <div className={styles.formWrapper}>
        {type === 'product' ? <CreateProduct /> : <CreateService />}
      </div>
    </div>
  );
};

export default CreateListing;