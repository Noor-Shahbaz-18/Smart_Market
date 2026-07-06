import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceApi } from '../../../api/serviceApi';
import ServiceForm from './ServiceForm';
import toast from 'react-hot-toast';

const CreateService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await serviceApi.create(formData);
      toast.success('Service posted! Pending admin approval.');
      navigate(`/services/${res.data.service._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--white)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
    }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>Post a Service</h2>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
          Fill in the details to offer your service on the marketplace
        </p>
      </div>
      <ServiceForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateService;