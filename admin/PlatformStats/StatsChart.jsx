import React from 'react';

// Simple bar chart without external library
const StatsChart = ({ stats }) => {
  const data = [
    { label: 'Users', value: stats?.users || 0, color: '#2563eb' },
    { label: 'Products', value: stats?.products || 0, color: '#10b981' },
    { label: 'Services', value: stats?.services || 0, color: '#f59e0b' },
    { label: 'Bookings', value: stats?.bookings || 0, color: '#8b5cf6' },
  ];

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div style={{
      background: 'var(--white)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginTop: '1.5rem',
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Platform Overview Chart
      </h3>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', height: '180px' }}>
        {data.map((d) => (
          <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: d.color }}>{d.value}</span>
            <div style={{
              width: '100%',
              height: `${(d.value / max) * 140}px`,
              minHeight: '4px',
              background: d.color,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.5s',
            }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsChart;