import React, { useState } from 'react';

const StarRating = ({ value, onChange, size = 24 }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            fontSize: size,
            cursor: 'pointer',
            color: star <= (hovered || value) ? '#f59e0b' : '#d1d5db',
            transition: 'color 0.15s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;