import React, { useState, useRef, useEffect } from 'react';
import { useNotification } from '../../../hooks/useNotification';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import styles from './NotificationBell.module.css';

const NotificationBell = () => {
  const { unreadCount } = useNotification();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
      <button className={styles.bell} onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  );
};

export default NotificationBell;