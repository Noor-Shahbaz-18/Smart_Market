import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../api/bookingApi';
import BookingList from '../../components/bookings/BookingList/BookingList';
import BookingFilters from '../../components/bookings/BookingList/BookingFilters';
import styles from './Bookings.module.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('client');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [role, status]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingApi.getMy({ role, status });
      setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container page-padding ${styles.page}`}>
      <h1 className={styles.title}>My Bookings</h1>

      <BookingFilters
        role={role}
        status={status}
        onRoleChange={(r) => { setRole(r); }}
        onStatusChange={(s) => { setStatus(s); }}
      />

      <BookingList
        bookings={bookings}
        loading={loading}
        onRefresh={fetchBookings}
      />
    </div>
  );
};

export default Bookings;