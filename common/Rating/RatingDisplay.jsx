import React from 'react';

const RatingDisplay = ({ rating = 0, count = 0, size = 16 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: size,
            color: star <= Math.round(rating) ? '#f59e0b' : '#d1d5db',
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: size - 2, color: 'var(--gray)', marginLeft: '4px' }}>
        ({count})
      </span>
    </div>
  );
};

export default RatingDisplay;