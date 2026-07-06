import React, { useState } from 'react';
import { reviewApi } from '../../../api/reviewApi';
import StarRating from '../../common/Rating/StarRating';
import TextArea from '../../common/Input/TextArea';
import Button from '../../common/Button/Button';
import toast from 'react-hot-toast';

const ReviewForm = ({ targetType, targetId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error('Please select a rating');
    if (!comment.trim()) return toast.error('Please write a comment');

    setLoading(true);
    try {
      await reviewApi.create({ targetType, targetId, rating, comment });
      toast.success('Review submitted!');
      setRating(0);
      setComment('');
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--light-gray)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginBottom: '2rem',
    }}>
      <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem' }}>
            Rating
          </label>
          <StarRating value={rating} onChange={setRating} size={28} />
        </div>

        <TextArea
          label="Comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          required
        />

        <Button type="submit" loading={loading}>
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;