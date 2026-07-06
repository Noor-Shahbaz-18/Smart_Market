import React, { useState } from 'react';
import styles from './ProductDetail.module.css';

const ProductImages = ({ images = [], title }) => {
  const [selected, setSelected] = useState(0);

  const placeholder = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';

  return (
    <div className={styles.imageSection}>
      <div className={styles.mainImage}>
        <img
          src={images[selected] || placeholder}
          alt={title}
          className={styles.main}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${title} ${i + 1}`}
              onClick={() => setSelected(i)}
              className={`${styles.thumb} ${i === selected ? styles.activeThumb : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;