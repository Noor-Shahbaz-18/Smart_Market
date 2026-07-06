import React, { useState } from 'react';

const PortfolioGallery = ({ images = [], title }) => {
  const [selected, setSelected] = useState(0);
  const placeholder = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="66" fill="%239ca3af"%3ENo Portfolio%3C/text%3E%3C/svg%3E';

  return (
    <div>
      <div style={{
        width: '100%',
        height: '360px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--light-gray)',
        marginBottom: '0.75rem',
      }}>
        <img
          src={images[selected] || placeholder}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`portfolio ${i + 1}`}
              onClick={() => setSelected(i)}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius)',
                objectFit: 'cover',
                cursor: 'pointer',
                border: `2px solid ${i === selected ? 'var(--primary)' : 'transparent'}`,
                transition: 'border-color 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;