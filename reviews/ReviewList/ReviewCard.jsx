import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getAvatar } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import RatingDisplay from '../../common/Rating/RatingDisplay';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();
  const { _id, reviewer, rating, comment, createdAt, isReported } = review;

  const isOwner = reviewer?._id === user?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <div style={{
      background: 'var(--white)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <img
            src={getAvatar(reviewer?.avatar, reviewer?.name)}
            alt={reviewer?.name}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{reviewer?.name}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{timeAgo(createdAt)}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <RatingDisplay rating={rating} />
          {(isOwner || isAdmin) && (
            <button
              onClick={() => onDelete(_id)}
              style={{
                background: 'none',
                color: 'var(--danger)',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p style={{ marginTop: '0.75rem', color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
        {comment}
      </p>

      {isReported && (
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--warning)',
          marginTop: '0.5rem',
          display: 'block',
        }}>
          ⚠️ Reported
        </span>
      )}
    </div>
  );
};

export default ReviewCard;