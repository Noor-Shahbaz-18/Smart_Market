import React from 'react';

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  rows = 4,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500, fontSize: '0.9rem' }}>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        style={{
          width: '100%',
          padding: '0.6rem 0.9rem',
          border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          fontSize: '0.95rem',
          resize: 'vertical',
          background: 'var(--white)',
          color: 'var(--dark)',
          fontFamily: 'var(--font)',
        }}
      />
      {error && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  );
};

export default TextArea;