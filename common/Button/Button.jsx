import React from 'react';
import styles from './Button.module.css';
import Spinner from '../Loader/Spinner';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style = {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      className={`
        ${styles.btn}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
      `}
    >
      {loading ? <Spinner size={18} color="white" /> : children}
    </button>
  );
};

export default Button;