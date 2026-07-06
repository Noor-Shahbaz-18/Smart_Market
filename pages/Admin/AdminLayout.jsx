import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAvatar } from '../../utils/helpers';
import styles from './Admin.module.css';

const navItems = [
  { label: 'Dashboard', icon: '📊', path: '/admin' },
  { label: 'Users', icon: '👥', path: '/admin/users' },
  { label: 'Listings', icon: '📋', path: '/admin/listings' },
  { label: 'Statistics', icon: '📈', path: '/admin/stats' },
  { label: 'Reports', icon: '🚨', path: '/admin/reports' },
  { label: 'Activity', icon: '🕐', path: '/admin/activity' },
];

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          {!collapsed && <h2 className={styles.logo}>⚙️ Admin</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapseBtn}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNav : ''}`
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <img
            src={getAvatar(user?.avatar, user?.name)}
            alt={user?.name}
            className={styles.userAvatar}
          />
          {!collapsed && (
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.name}</p>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;