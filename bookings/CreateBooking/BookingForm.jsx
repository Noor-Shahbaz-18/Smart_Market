import React, { useState } from 'react';
import { bookingApi } from '../../../api/bookingApi';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../common/Input/Input';
import TextArea from '../../common/Input/TextArea';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatters';
import toast from 'react-hot-toast';

const BookingForm = ({ service, onSuccess }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.preferredDate) newErrors.preferredDate = 'Date is required';
    if (!form.preferredTime) newErrors.preferredTime = 'Time is required';
    const selected = new Date(form.preferredDate);
    if (selected < new Date().setHours(0, 0, 0, 0)) {
      newErrors.preferredDate = 'Date cannot be in the past';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await bookingApi.create({
        service: service._id,
        provider: service.provider._id,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        message: form.message,
        totalAmount: service.price,
      });
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit}>
      {/* Service Summary */}
      <div style={{
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius)',
        padding: '1rem',
        marginBottom: '1.25rem',
      }}>
        <p style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{service.title}</p>
        <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
          {formatPrice(service.price)}
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>
          Provider: {service.provider?.name}
        </p>
      </div>

      <Input
        label="Preferred Date"
        name="preferredDate"
        type="date"
        value={form.preferredDate}
        onChange={handleChange}
        error={errors.preferredDate}
        required
        style={{ min: today }}
      />

      <Input
        label="Preferred Time"
        name="preferredTime"
        type="time"
        value={form.preferredTime}
        onChange={handleChange}
        error={errors.preferredTime}
        required
      />

      <TextArea
        label="Message to Provider (Optional)"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Describe your requirements..."
        rows={3}
      />

      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        marginBottom: '1rem',
        fontWeight: 600,
      }}>
        <span>Total Amount</span>
        <span style={{ color: 'var(--primary)' }}>{formatPrice(service.price)}</span>
      </div>

      <Button type="submit" loading={loading} fullWidth size="lg">
        Send Booking Request
      </Button>
    </form>
  );
};

export default BookingForm;