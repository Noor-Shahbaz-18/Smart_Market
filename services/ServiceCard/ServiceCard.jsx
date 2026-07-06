import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';
import { getAvatar } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import RatingDisplay from '../../common/Rating/RatingDisplay';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
  const { _id, title, price, portfolioImages, provider, category, ratings, deliveryTime, availability, createdAt } = service;

  return (
    <Link to={`/services/${_id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={portfolioImages?.[0] || 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="33" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E'}
          alt={title}
          className={styles.image}
        />
        {!availability && (
          <span className={styles.unavailableBadge}>Unavailable</span>
        )}
        {category && (
          <span className={styles.categoryBadge}>{category}</span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.providerRow}>
          <img
            src={getAvatar(provider?.avatar, provider?.name)}
            alt={provider?.name}
            className={styles.providerAvatar}
          />
          <span className={styles.providerName}>{provider?.name}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <RatingDisplay
          rating={ratings?.average || 0}
          count={ratings?.count || 0}
        />

        <div className={styles.footer}>
          <div>
            <span className={styles.startingFrom}>Starting at</span>
            <p className={styles.price}>{formatPrice(price)}</p>
          </div>
          <span className={styles.delivery}>⏱ {deliveryTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;