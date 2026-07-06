import React from 'react';
import { SERVICE_CATEGORIES } from '../../../utils/constants';
import styles from './ServiceFilters.module.css';

const ServiceFilters = ({ filters, onFilterChange }) => {
  const { category, minPrice, maxPrice, minRating, availability } = filters;

  const handleReset = () => {
    ['category', 'minPrice', 'maxPrice', 'minRating', 'availability'].forEach(
      (key) => onFilterChange(key, '')
    );
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
        {SERVICE_CATEGORIES.map((cat) => (
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
        <h4>Price Range (Rs.)</h4>
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

      {/* Rating */}
      <div className={styles.group}>
        <h4>Minimum Rating</h4>
        {[4, 3, 2, 1].map((r) => (
          <label key={r} className={styles.checkLabel}>
            <input
              type="radio"
              name="minRating"
              value={r}
              checked={minRating === String(r)}
              onChange={() => onFilterChange('minRating', r)}
            />
            {'★'.repeat(r)} & above
          </label>
        ))}
      </div>

      {/* Availability */}
      <div className={styles.group}>
        <h4>Availability</h4>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            checked={availability === 'true'}
            onChange={(e) =>
              onFilterChange('availability', e.target.checked ? 'true' : '')
            }
          />
          Available Now
        </label>
      </div>
    </div>
  );
};

export default ServiceFilters;