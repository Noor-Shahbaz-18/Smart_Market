import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import NotificationBell from '../../notifications/NotificationBell/NotificationBell';
import MobileMenu from './MobileMenu';
import { getAvatar } from '../../../utils/helpers';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Smart<span>Market</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Right Side */}
        <div className={styles.navRight}>
          {user ? (
            <>
              <NotificationBell />

              <Link to="/create-listing" className={styles.postBtn}>
                + Post
              </Link>

              {/* Avatar Dropdown */}
              <div className={styles.avatarWrapper}>
                <img
                  src={getAvatar(user.avatar, user.name)}
                  alt={user.name}
                  className={styles.avatar}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                    <Link to={`/profile/${user._id}`} onClick={() => setDropdownOpen(false)}>Profile</Link>
                    <Link to="/bookings" onClick={() => setDropdownOpen(false)}>Bookings</Link>
                    <Link to="/messages" onClick={() => setDropdownOpen(false)}>Messages</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setDropdownOpen(false)}>Admin Panel</Link>
                    )}
                    <hr />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authBtns}>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
            </div>
          )}

          {/* Hamburger */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;