import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import TextArea from '../../common/Input/TextArea';
import Select from '../../common/Input/Select';
import ImageUpload from '../../common/ImageUpload/ImageUpload';
import Button from '../../common/Button/Button';
import { PRODUCT_CONDITIONS } from '../../../utils/constants';

const CATEGORIES = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Books', label: 'Books' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Vehicles', label: 'Vehicles' },
  { value: 'Food', label: 'Food' },
  { value: 'Other', label: 'Other' },
];

const CONDITIONS = PRODUCT_CONDITIONS.map((c) => ({
  value: c,
  label: c.charAt(0).toUpperCase() + c.slice(1),
}));

const ProductForm = ({ initialValues = {}, onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'new',
    location: '',
    ...initialValues,
    images: undefined, // never mix images (array of URLs) into text form state
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.price || isNaN(form.price)) newErrors.price = 'Valid price is required';
    if (!form.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'images' || val === undefined) return;
      formData.append(key, val);
    });
    images.forEach((img) => formData.append('images', img));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Product Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. iPhone 13 Pro Max"
        error={errors.title}
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe your product in detail..."
        rows={5}
        error={errors.description}
        required
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input
          label="Price (Rs.)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="0"
          error={errors.price}
          required
        />
        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Lahore, Pakistan"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={CATEGORIES}
          error={errors.category}
          required
        />
        <Select
          label="Condition"
          name="condition"
          value={form.condition}
          onChange={handleChange}
          options={CONDITIONS}
        />
      </div>

      <ImageUpload
        label="Product Images (Max 5)"
        multiple
        maxFiles={5}
        onChange={setImages}
        existingImages={initialValues.images || []}
      />

      <Button type="submit" loading={loading} fullWidth size="lg">
        {initialValues.title ? 'Update Product' : 'Post Product'}
      </Button>
    </form>
  );
};

export default ProductForm;