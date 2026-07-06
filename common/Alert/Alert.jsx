import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const colors = {
    success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
    warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    info: { bg: '#dbeafe', border: '#2563eb', text: '#1e40af' },
  };

  const c = colors[type];

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      borderRadius: 'var(--radius)',
      padding: '0.75rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      fontSize: '0.9rem',
    }}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', color: c.text, fontSize: '1rem', marginLeft: '1rem' }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;