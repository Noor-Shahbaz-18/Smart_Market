import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import { formatDate } from '../../../utils/formatDate';
import { capitalize } from '../../../utils/formatters';
import { getStatusColor } from '../../../utils/helpers';

const ProductInfo = ({ product }) => {
  const { title, description, price, condition, location, status, views, createdAt, category } = product;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{title}</h1>
        <span style={{
          background: getStatusColor(status),
          color: 'white',
          padding: '0.2rem 0.7rem',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {status}
        </span>
      </div>

      <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
        {formatPrice(price)}
      </p>

      <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Condition', value: capitalize(condition) },
          { label: 'Category', value: category || 'N/A' },
          { label: 'Location', value: location || 'N/A' },
          { label: 'Views', value: views },
          { label: 'Listed On', value: formatDate(createdAt) },
        ].map((item) => (
          <div key={item.label} style={{
            background: 'var(--light-gray)',
            borderRadius: 'var(--radius)',
            padding: '0.6rem 0.9rem',
          }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--gray)', marginBottom: '0.2rem' }}>{item.label}</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;