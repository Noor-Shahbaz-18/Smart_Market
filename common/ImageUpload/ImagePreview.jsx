import React from 'react';

const ImagePreview = ({ url, onRemove }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100px',
      height: '100px',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1.5px solid var(--border)',
    }}>
      <img
        src={url}
        alt="preview"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <button
        onClick={onRemove}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          borderRadius: '50%',
          width: '22px',
          height: '22px',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default ImagePreview;