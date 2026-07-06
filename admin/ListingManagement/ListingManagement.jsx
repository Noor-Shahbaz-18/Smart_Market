import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import ListingApproval from './ListingApproval';
import Spinner from '../../common/Loader/Spinner';
import styles from './ListingManagement.module.css';

const ListingManagement = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('products');

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPendingListings();
      setProducts(res.data.products);
      setServices(res.data.services);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, id, action) => {
    try {
      await adminApi.approveListing(type, id, action);
      if (type === 'product') {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const items = tab === 'products' ? products : services;

  return (
    <div>
      <div className={styles.header}>
        <h1>Listing Management</h1>
        <p>Review and approve or reject pending listings</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'products' ? styles.active : ''}`}
          onClick={() => setTab('products')}
        >
          📦 Pending Products ({products.length})
        </button>
        <button
          className={`${styles.tab} ${tab === 'services' ? styles.active : ''}`}
          onClick={() => setTab('services')}
        >
          🛠️ Pending Services ({services.length})
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          <p>✅ No pending {tab} to review</p>
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <ListingApproval
              key={item._id}
              listing={item}
              type={tab === 'products' ? 'product' : 'service'}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingManagement;