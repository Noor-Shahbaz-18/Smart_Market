import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '../../api/serviceApi';
import { favoriteApi } from '../../api/favoriteApi';
import { chatApi } from '../../api/chatApi';
import { useAuth } from '../../hooks/useAuth';
import ServiceInfo from '../../components/services/ServiceDetail/ServiceInfo';
import PortfolioGallery from '../../components/services/ServiceDetail/PortfolioGallery';
import ReviewList from '../../components/reviews/ReviewList/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm/ReviewForm';
import BookingForm from '../../components/bookings/CreateBooking/BookingForm';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import Spinner from '../../components/common/Loader/Spinner';
import RatingDisplay from '../../components/common/Rating/RatingDisplay';
import { getAvatar, isOwner } from '../../utils/helpers';
import { formatPrice } from '../../utils/formatters';
import toast from 'react-hot-toast';
import styles from './ServiceDetail.module.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await serviceApi.getOne(id);
      setService(res.data.service);
    } catch {
      toast.error('Service not found');
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    if (!user) return navigate('/login');
    try {
      const res = await chatApi.createOrGet(service.provider._id);
      navigate('/messages', { state: { conversationId: res.data.conversation._id } });
    } catch {
      toast.error('Could not start conversation');
    }
  };

  const handleFavorite = async () => {
    if (!user) return navigate('/login');
    try {
      if (isFav) {
        await favoriteApi.remove(service._id);
        setIsFav(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteApi.add({ targetType: 'service', targetId: service._id });
        setIsFav(true);
        toast.success('Added to favorites');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await serviceApi.delete(id);
      toast.success('Service deleted');
      navigate('/services');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Spinner />;
  if (!service) return null;

  const mine = isOwner(service, user?._id);

  return (
    <div className={`container page-padding ${styles.page}`}>
      <div className={styles.grid}>

        <div>
          <PortfolioGallery images={service.portfolioImages} title={service.title} />
          <ServiceInfo service={service} />
        </div>

        <div className={styles.stickyCard}>
          <div className={styles.bookingCard}>
            <div className={styles.priceRow}>
              <div>
                <span className={styles.startingFrom}>Starting at</span>
                <p className={styles.price}>{formatPrice(service.price)}</p>
              </div>
              <RatingDisplay
                rating={service.ratings?.average || 0}
                count={service.ratings?.count || 0}
              />
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span>⏱</span>
                <span>{service.deliveryTime}</span>
              </div>
              <div className={styles.metaItem}>
                <span>{service.availability ? '✅' : '❌'}</span>
                <span>{service.availability ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>

            {!mine ? (
              <div className={styles.actions}>
                <Button
                  fullWidth
                  onClick={() => {
                    if (!user) return navigate('/login');
                    setBookingModal(true);
                  }}
                  disabled={!service.availability}
                >
                  📅 Book Now
                </Button>
                <Button variant="outline" fullWidth onClick={handleMessage}>
                  💬 Message Provider
                </Button>
                <Button
                  variant={isFav ? 'danger' : 'ghost'}
                  fullWidth
                  onClick={handleFavorite}
                >
                  {isFav ? '❤️ Remove Favorite' : '🤍 Save Favorite'}
                </Button>
              </div>
            ) : (
              <div className={styles.actions}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(`/services/${id}/edit`)}
                >
                  ✏️ Edit Service
                </Button>
                <Button variant="danger" fullWidth onClick={handleDelete}>
                  🗑️ Delete Service
                </Button>
              </div>
            )}

            <div
              className={styles.providerCard}
              onClick={() => navigate(`/profile/${service.provider._id}`)}
            >
              <img
                src={getAvatar(service.provider.avatar, service.provider.name)}
                alt={service.provider.name}
                className={styles.providerAvatar}
              />
              <div>
                <p className={styles.providerName}>{service.provider.name}</p>
                <p className={styles.providerLocation}>
                  {service.provider.location || 'Pakistan'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {user && !mine && (
          <ReviewForm
            targetType="service"
            targetId={id}
            onSuccess={fetchService}
          />
        )}
        <ReviewList targetType="service" targetId={id} />
      </div>

      <Modal
        isOpen={bookingModal}
        onClose={() => setBookingModal(false)}
        title="Book This Service"
        size="md"
      >
        <BookingForm
          service={service}
          onSuccess={() => {
            setBookingModal(false);
            toast.success('Booking request sent!');
            navigate('/bookings');
          }}
        />
      </Modal>
    </div>
  );
};

export default ServiceDetail;