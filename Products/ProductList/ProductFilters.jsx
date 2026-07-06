import React from 'react';
import { PRODUCT_CONDITIONS } from '../../../utils/constants';
import styles from './ProductFilters.module.css';

const ProductFilters = ({ filters, onFilterChange }) => {
  const { category, minPrice, maxPrice, condition } = filters;

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Furniture',
    'Sports', 'Vehicles', 'Food', 'Other',
  ];

  const handleReset = () => {
    onFilterChange('category', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');
    onFilterChange('condition', '');
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h3>Filters</h3>
        <button onClick={handleReset} className={styles.resetBtn}>Reset</button>
      </div>

      {/* Category */}
      <div className={styles.group}>
        <h4>Category</h4>
        {categories.map((cat) => (
          <label key={cat} className={styles.checkLabel}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={() => onFilterChange('category', cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className={styles.group}>
        <h4>Price Range</h4>
        <div className={styles.priceRow}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className={styles.priceInput}
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className={styles.priceInput}
          />
        </div>
      </div>

      {/* Condition */}
      <div className={styles.group}>
        <h4>Condition</h4>
        {PRODUCT_CONDITIONS.map((cond) => (
          <label key={cond} className={styles.checkLabel}>
            <input
              type="radio"
              name="condition"
              value={cond}
              checked={condition === cond}
              onChange={() => onFilterChange('condition', cond)}
            />
            {cond.charAt(0).toUpperCase() + cond.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;