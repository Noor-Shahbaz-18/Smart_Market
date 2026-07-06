import React from 'react';
import { Link } from 'react-router-dom';
import { getAvatar } from '../../../utils/helpers';
import styles from './Navbar.module.css';

const MobileMenu = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={drawer}>
        <button onClick={onClose} style={closeBtn}>✕</button>

        {user && (
          <div style={userInfo}>
            <img
              src={getAvatar(user.avatar, user.name)}
              alt={user.name}
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontWeight: 600 }}>{user.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{user.email}</p>
            </div>
          </div>
        )}

        <nav style={navLinks}>
          <Link to="/" onClick={onClose}>🏠 Home</Link>
          <Link to="/products" onClick={onClose}>📦 Products</Link>
          <Link to="/services" onClick={onClose}>🛠️ Services</Link>
          <Link to="/about" onClick={onClose}>ℹ️ About</Link>
          <Link to="/contact" onClick={onClose}>📞 Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={onClose}>📊 Dashboard</Link>
              <Link to={`/profile/${user._id}`} onClick={onClose}>👤 Profile</Link>
              <Link to="/bookings" onClick={onClose}>📅 Bookings</Link>
              <Link to="/messages" onClick={onClose}>💬 Messages</Link>
              <Link to="/create-listing" onClick={onClose}>➕ Post Listing</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={onClose}>⚙️ Admin Panel</Link>
              )}
              <button onClick={() => { onLogout(); onClose(); }} style={logoutBtn}>
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={onClose}>🔑 Login</Link>
              <Link to="/register" onClick={onClose}>📝 Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 999,
};

const drawer = {
  position: 'fixed', top: 0, left: 0,
  width: '75%', maxWidth: '300px',
  height: '100vh',
  background: 'var(--white)',
  padding: '1.5rem',
  overflowY: 'auto',
  zIndex: 1000,
};

const closeBtn = {
  background: 'none',
  fontSize: '1.3rem',
  marginBottom: '1rem',
  color: 'var(--dark)',
};

const userInfo = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--border)',
};

const navLinks = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const logoutBtn = {
  background: 'none',
  color: 'var(--danger)',
  fontSize: '1rem',
  textAlign: 'left',
  padding: '0.6rem 0',
  width: '100%',
};

export default MobileMenu;