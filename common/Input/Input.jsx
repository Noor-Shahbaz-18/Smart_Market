import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  style = {},
}) => {
  return (
    <div style={{ marginBottom: '1rem', ...style }}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          ...inputStyle,
          borderColor: error ? 'var(--danger)' : 'var(--border)',
        }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.3rem',
  fontWeight: 500,
  fontSize: '0.9rem',
  color: 'var(--dark)',
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.9rem',
  border: '1.5px solid',
  borderRadius: 'var(--radius)',
  fontSize: '0.95rem',
  background: 'var(--white)',
  color: 'var(--dark)',
  transition: 'border-color 0.2s',
};

const errorStyle = {
  color: 'var(--danger)',
  fontSize: '0.8rem',
  marginTop: '0.3rem',
};

export default Input;