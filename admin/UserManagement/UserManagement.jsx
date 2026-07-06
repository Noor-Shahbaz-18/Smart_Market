import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import UserTable from './UserTable';
import UserFilters from './UserFilters';
import Spinner from '../../common/Loader/Spinner';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({ search, page, limit: 15 });
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSuspend = async (id) => {
    try {
      await adminApi.toggleSuspend(id);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isSuspended: !u.isSuspended } : u
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Total: {total} users</p>
      </div>

      <UserFilters search={search} onSearch={setSearch} />

      {loading ? (
        <Spinner />
      ) : (
        <UserTable
          users={users}
          onToggleSuspend={handleToggleSuspend}
        />
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={styles.pageBtn}
        >
          ← Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={users.length < 15}
          onClick={() => setPage((p) => p + 1)}
          className={styles.pageBtn}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default UserManagement;