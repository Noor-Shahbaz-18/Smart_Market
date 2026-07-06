import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceApi } from '../../../api/serviceApi';
import ServiceForm from '../CreateService/ServiceForm';
import Spinner from '../../common/Loader/Spinner';
import toast from 'react-hot-toast';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await serviceApi.getOne(id);
        setService(res.data.service);
      } catch {
        toast.error('Service not found');
        navigate('/dashboard');
      } finally {
        setFetching(false);
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await serviceApi.update(id, formData);
      toast.success('Service updated successfully!');
      navigate(`/services/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spinner />;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      padding: '0 1rem',
    }}>
      <div style={{
        background: 'var(--white)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
      }}>
        <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>Edit Service</h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Update your service details</p>
        </div>

        {service && (
          <ServiceForm
            initialValues={{
              title: service.title,
              description: service.description,
              category: service.category || '',
              price: service.price,
              deliveryTime: service.deliveryTime,
              tags: service.tags?.join(', ') || '',
              availability: service.availability,
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default EditService;