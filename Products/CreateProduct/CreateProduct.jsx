import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../../api/productApi';
import ProductForm from './ProductForm';
import toast from 'react-hot-toast';
import styles from './CreateProduct.module.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await productApi.create(formData);
      toast.success('Product posted! Pending admin approval.');
      navigate(`/products/${res.data.product._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Post a Product</h2>
        <p>Fill in the details to list your product on the marketplace</p>
      </div>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateProduct;