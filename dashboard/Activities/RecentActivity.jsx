import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from '../../../api/productApi';
import { serviceApi } from '../../../api/serviceApi';
import { formatPrice } from '../../../utils/formatters';
import { getStatusColor } from '../../../utils/helpers';
import Button from '../../common/Button/Button';
import toast from 'react-hot-toast';
import styles from './RecentActivity.module.css';

const RecentActivity = ({ products = [], services = [] }) => {
  const [tab, setTab] = useState('products');
  const navigate = useNavigate();

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productApi.delete(id);
      toast.success('Product deleted');
      window.location.reload();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await serviceApi.delete(id);
      toast.success('Service deleted');
      window.location.reload();
    } catch {
      toast.error('Delete failed');
    }
  };

  const items = tab === 'products' ? products : services;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'products' ? styles.active : ''}`}
          onClick={() => setTab('products')}
        >
          📦 Products ({products.length})
        </button>
        <button
          className={`${styles.tab} ${tab === 'services' ? styles.active : ''}`}
          onClick={() => setTab('services')}
        >
          🛠️ Services ({services.length})
        </button>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>No {tab} listed yet</p>
          <Button size="sm" onClick={() => navigate('/create-listing')}>
            + Add Listing
          </Button>
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item._id} className={styles.item}>
              <img
                src={
                  item.images?.[0] ||
                  item.portfolioImages?.[0] ||
                  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Crect width="60" height="60" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="%239ca3af"%3ENo Img%3C/text%3E%3C/svg%3E'
                }
                alt={item.title}
                className={styles.thumb}
              />
              <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.price}>{formatPrice(item.price)}</p>
              </div>
              <span
                className={styles.badge}
                style={{ background: getStatusColor(item.status) }}
              >
                {item.status}
              </span>
              <div className={styles.actions}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(
                      tab === 'products'
                        ? `/products/${item._id}`
                        : `/services/${item._id}`
                    )
                  }
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    tab === 'products'
                      ? handleDeleteProduct(item._id)
                      : handleDeleteService(item._id)
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;