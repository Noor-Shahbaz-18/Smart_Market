import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../../../api/productApi';
import ProductForm from '../CreateProduct/ProductForm';
import Spinner from '../../common/Loader/Spinner';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getOne(id);
        setProduct(res.data.product);
      } catch {
        toast.error('Product not found');
        navigate('/dashboard');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await productApi.update(id, formData);
      toast.success('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spinner />;

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{
        background: 'var(--white)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
      }}>
        <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>Edit Product</h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Update your product details</p>
        </div>

        {product && (
          <ProductForm
            initialValues={{
              title: product.title,
              description: product.description,
              price: product.price,
              category: product.category || '',
              condition: product.condition,
              location: product.location,
              images: product.images || [],
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;