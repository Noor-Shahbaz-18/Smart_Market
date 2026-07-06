import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userApi } from '../../api/userApi';
import { bookingApi } from '../../api/bookingApi';
import { favoriteApi } from '../../api/favoriteApi';
import StatsGrid from '../../components/dashboard/Stats/StatsGrid';
import ActiveListings from '../../components/dashboard/Activities/RecentActivity';
import QuickActions from '../../components/dashboard/QuickActions/QuickActions';
import Spinner from '../../components/common/Loader/Spinner';
import { getAvatar } from '../../utils/helpers';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState({ products: [], services: [] });
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listingsRes, bookingsRes, favRes] = await Promise.all([
        userApi.getMyListings(),
        bookingApi.getMy({ role: 'client' }),
        favoriteApi.getAll(),
      ]);
      setListings(listingsRes.data);
      setBookings(bookingsRes.data.bookings);
      setFavorites(favRes.data.favorites);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  const stats = [
    {
      label: 'Active Products',
      value: listings.products.filter((p) => p.status === 'active').length,
      icon: '📦',
      color: '#2563eb',
    },
    {
      label: 'Active Services',
      value: listings.services.filter((s) => s.status === 'active').length,
      icon: '🛠️',
      color: '#10b981',
    },
    {
      label: 'My Bookings',
      value: bookings.length,
      icon: '📅',
      color: '#f59e0b',
    },
    {
      label: 'Favorites',
      value: favorites.length,
      icon: '❤️',
      color: '#ef4444',
    },
    {
      label: 'Pending Listings',
      value: [
        ...listings.products.filter((p) => p.status === 'pending'),
        ...listings.services.filter((s) => s.status === 'pending'),
      ].length,
      icon: '⏳',
      color: '#8b5cf6',
    },
    {
      label: 'Earnings (Est.)',
      value: 'Rs. 0',
      icon: '💰',
      color: '#06b6d4',
    },
  ];

  return (
    <div className={`container page-padding ${styles.dashboard}`}>

      {/* Welcome Banner */}
      <div className={styles.welcome}>
        <img
          src={getAvatar(user?.avatar, user?.name)}
          alt={user?.name}
          className={styles.avatar}
        />
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p>Here's what's happening with your marketplace activity.</p>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Listings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>My Listings</h2>
        <ActiveListings
          products={listings.products}
          services={listings.services}
        />
      </div>

      {/* Recent Bookings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className={styles.empty}>No bookings yet</p>
        ) : (
          <div className={styles.bookingsList}>
            {bookings.slice(0, 5).map((b) => (
              <div key={b._id} className={styles.bookingItem}>
                <div>
                  <p className={styles.bookingTitle}>{b.service?.title}</p>
                  <p className={styles.bookingMeta}>
                    Provider: {b.provider?.name} · {new Date(b.preferredDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={styles.statusBadge}
                  style={{ background: b.status === 'accepted' ? '#10b981' : b.status === 'pending' ? '#f59e0b' : '#ef4444' }}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;