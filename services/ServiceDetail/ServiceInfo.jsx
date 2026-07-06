import React from 'react';
import { formatDate } from '../../../utils/formatDate';

const ServiceInfo = ({ service }) => {
  const { title, description, category, tags, createdAt } = service;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        {title}
      </h1>

      {category && (
        <span style={{
          background: 'var(--light-gray)',
          color: 'var(--primary)',
          padding: '0.3rem 0.8rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'inline-block',
          marginBottom: '1rem',
        }}>
          {category}
        </span>
      )}

      <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        {description}
      </p>

      {tags?.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Tags</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                background: 'var(--light-gray)',
                color: 'var(--gray)',
                padding: '0.25rem 0.7rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
        Listed on {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default ServiceInfo;