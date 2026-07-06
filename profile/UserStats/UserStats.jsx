import React from 'react';

const UserStats = ({ products = 0, services = 0, reviews = 0, rating = 0 }) => {
  const stats = [
    { label: 'Products', value: products },
    { label: 'Services', value: services },
    { label: 'Reviews', value: reviews },
    { label: 'Rating', value: rating > 0 ? `${rating}★` : 'N/A' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0.5rem',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--border)',
    }}>
      {stats.map((s) => (
        <div key={s.label} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
            {s.value}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;