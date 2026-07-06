import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error = '',
  required = false,
  placeholder = 'Select...',
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500, fontSize: '0.9rem' }}>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '0.6rem 0.9rem',
          border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          fontSize: '0.95rem',
          background: 'var(--white)',
          color: 'var(--dark)',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  );
};

export default Select;