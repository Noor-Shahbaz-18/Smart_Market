import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import SkeletonLoader from '../../components/common/Loader/SkeletonLoader';
import styles from './Home.module.css';

const FeaturedProducts = ({ products, loading }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Products</h2>
          <Link to="/products" className={styles.viewAll}>View All →</Link>
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
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;