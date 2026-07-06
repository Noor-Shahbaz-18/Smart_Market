import React from 'react';

const RatingSummary = ({ reviews = [] }) => {
  if (reviews.length === 0) return null;

  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      padding: '1.25rem',
      background: 'var(--light-gray)',
      borderRadius: 'var(--radius-lg)',
    }}>
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>{average}</p>
        <p style={{ color: '#f59e0b', fontSize: '1.2rem' }}>{'★'.repeat(Math.round(average))}</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{reviews.length} reviews</p>
      </div>

      <div style={{ flex: 1 }}>
        {counts.map(({ star, count, percent }) => (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gray)', width: '16px' }}>{star}</span>
            <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
            <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${percent}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--gray)', width: '28px' }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;