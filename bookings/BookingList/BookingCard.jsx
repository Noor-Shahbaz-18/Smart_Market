import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../../../api/bookingApi';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate, formatTime } from '../../../utils/formatDate';
import { formatPrice } from '../../../utils/formatters';
import { getStatusColor, getAvatar } from '../../../utils/helpers';
import Button from '../../common/Button/Button';
import toast from 'react-hot-toast';
import styles from './BookingCard.module.css';

const BookingCard = ({ booking, onRefresh }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { _id, service, client, provider, preferredDate, preferredTime, status, totalAmount, message } = booking;

  const isProvider = provider?._id === user?._id || provider === user?._id;
  const isClient = client?._id === user?._id || client === user?._id;

  const handleStatus = async (newStatus) => {
    try {
      await bookingApi.updateStatus(_id, newStatus);
      toast.success(`Booking ${newStatus}`);
      onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.serviceTitle}>{service?.title || 'Service'}</h3>
          <p className={styles.meta}>
            📅 {formatDate(preferredDate)} at {preferredTime}
          </p>
        </div>
        <span
          className={styles.badge}
          style={{ background: getStatusColor(status) }}
        >
          {status}
        </span>
      </div>

      <div className={styles.parties}>
        <div className={styles.party}>
          <img
            src={getAvatar(client?.avatar, client?.name)}
            alt={client?.name}
            className={styles.avatar}
          />
          <div>
            <p className={styles.partyLabel}>Client</p>
            <p className={styles.partyName}>{client?.name}</p>
          </div>
        </div>
        <span className={styles.arrow}>→</span>
        <div className={styles.party}>
          <img
            src={getAvatar(provider?.avatar, provider?.name)}
            alt={provider?.name}
            className={styles.avatar}
          />
          <div>
            <p className={styles.partyLabel}>Provider</p>
            <p className={styles.partyName}>{provider?.name}</p>
          </div>
        </div>
      </div>

      {message && (
        <p className={styles.message}>💬 {message}</p>
      )}

      <div className={styles.footer}>
        <p className={styles.amount}>{formatPrice(totalAmount)}</p>

        <div className={styles.actions}>
          {isProvider && status === 'pending' && (
            <>
              <Button size="sm" variant="secondary" onClick={() => handleStatus('accepted')}>
                ✅ Accept
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleStatus('rejected')}>
                ❌ Reject
              </Button>
            </>
          )}
          {isClient && status === 'pending' && (
            <Button size="sm" variant="danger" onClick={() => handleStatus('cancelled')}>
              Cancel
            </Button>
          )}
          {isProvider && status === 'accepted' && (
            <Button size="sm" variant="secondary" onClick={() => handleStatus('completed')}>
              ✔ Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;