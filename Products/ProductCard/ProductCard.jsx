import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';
import { getAvatar, getStatusColor } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import RatingDisplay from '../../common/Rating/RatingDisplay';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { _id, title, price, images, seller, condition, location, createdAt } = product;

  return (
    <Link to={`/products/${_id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={images?.[0] || 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="33" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E'}
          alt={title}
          className={styles.image}
        />
        <span className={styles.condition}>{condition}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{formatPrice(price)}</p>

        {location && (
          <p className={styles.location}>📍 {location}</p>
        )}

        <div className={styles.footer}>
          <div className={styles.seller}>
            <img
              src={getAvatar(seller?.avatar, seller?.name)}
              alt={seller?.name}
              className={styles.sellerAvatar}
            />
            <span>{seller?.name}</span>
          </div>
          <span className={styles.time}>{timeAgo(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;