import React from 'react';
import { getAvatar } from '../../../utils/helpers';
import { formatDate } from '../../../utils/formatDate';
import styles from './UserTable.module.css';

const UserTable = ({ users, onToggleSuspend }) => {
  if (users.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.userCell}>
                  <img
                    src={getAvatar(user.avatar, user.name)}
                    alt={user.name}
                    className={styles.avatar}
                  />
                  <span>{user.name}</span>
                </div>
              </td>
              <td className={styles.email}>{user.email}</td>
              <td>
                <span className={`${styles.role} ${user.role === 'admin' ? styles.adminRole : ''}`}>
                  {user.role}
                </span>
              </td>
              <td className={styles.date}>{formatDate(user.createdAt)}</td>
              <td>
                <span className={`${styles.status} ${user.isSuspended ? styles.suspended : styles.active}`}>
                  {user.isSuspended ? 'Suspended' : 'Active'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => onToggleSuspend(user._id)}
                  className={`${styles.actionBtn} ${user.isSuspended ? styles.unsuspendBtn : styles.suspendBtn}`}
                  disabled={user.role === 'admin'}
                >
                  {user.isSuspended ? 'Unsuspend' : 'Suspend'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;