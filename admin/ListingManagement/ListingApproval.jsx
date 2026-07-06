import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import { formatDate } from '../../../utils/formatDate';
import { getAvatar } from '../../../utils/helpers';
import Button from '../../common/Button/Button';
import styles from './ListingApproval.module.css';

const ListingApproval = ({ listing, type, onAction }) => {
  const owner = listing.seller || listing.provider;
  const image = listing.images?.[0] || listing.portfolioImages?.[0];

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image || 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="90" viewBox="0 0 120 90"%3E%3Crect width="120" height="90" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E'}
          alt={listing.title}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <h3 className={styles.title}>{listing.title}</h3>
          <span className={styles.type}>{type}</span>
        </div>

        <p className={styles.desc}>
          {listing.description?.slice(0, 120)}...
        </p>

        <div className={styles.meta}>
          <span>💰 {formatPrice(listing.price)}</span>
          {listing.deliveryTime && <span>⏱ {listing.deliveryTime}</span>}
          <span>📅 {formatDate(listing.createdAt)}</span>
        </div>

        <div className={styles.owner}>
          <img
            src={getAvatar(owner?.avatar, owner?.name)}
            alt={owner?.name}
            className={styles.ownerAvatar}
          />
          <span>{owner?.name}</span>
          <span className={styles.ownerEmail}>{owner?.email}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction(type, listing._id, 'approve')}
        >
          ✅ Approve
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onAction(type, listing._id, 'reject')}
        >
          ❌ Reject
        </Button>
      </div>
    </div>
  );
};

export default ListingApproval;