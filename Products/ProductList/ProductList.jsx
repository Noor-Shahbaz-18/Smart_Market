import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../../common/Loader/Spinner';
import styles from './ProductList.module.css';

const ProductList = ({ products = [], loading = false }) => {
  if (loading) return <Spinner />;

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
        <p style={{ fontSize: '1.1rem' }}>😕 No products found</p>
        <small>Try adjusting your filters or search query</small>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;