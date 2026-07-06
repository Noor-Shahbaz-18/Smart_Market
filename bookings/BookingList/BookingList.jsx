import React from 'react';
import BookingCard from './BookingCard';
import Spinner from '../../common/Loader/Spinner';
import styles from './BookingList.module.css';

const BookingList = ({ bookings = [], loading = false, onRefresh }) => {
  if (loading) return <Spinner />;

  if (bookings.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📭 No bookings found</p>
        <small>Your bookings will appear here</small>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onRefresh={onRefresh} />
      ))}
    </div>
  );
};

export default BookingList;