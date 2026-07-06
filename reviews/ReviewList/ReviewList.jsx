import React, { useEffect, useState } from 'react';
import { reviewApi } from '../../../api/reviewApi';
import ReviewCard from './ReviewCard';
import Spinner from '../../common/Loader/Spinner';
import RatingSummary from '../RatingSummary/RatingSummary';

const ReviewList = ({ targetType, targetId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [targetId]);

  const fetchReviews = async () => {
    try {
      const res = await reviewApi.getAll(targetType, targetId);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await reviewApi.delete(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Spinner />;

  if (reviews.length === 0) {
    return (
      <p style={{ color: 'var(--gray)', fontStyle: 'italic', padding: '1rem 0' }}>
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div>
      <RatingSummary reviews={reviews} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;