import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import TextArea from '../../common/Input/TextArea';
import Select from '../../common/Input/Select';
import ImageUpload from '../../common/ImageUpload/ImageUpload';
import Button from '../../common/Button/Button';
import { SERVICE_CATEGORIES } from '../../../utils/constants';

const CATEGORY_OPTIONS = SERVICE_CATEGORIES.map((c) => ({ value: c, label: c }));

const ServiceForm = ({ initialValues = {}, onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    deliveryTime: '',
    tags: '',
    availability: true,
    ...initialValues,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.price || isNaN(form.price)) newErrors.price = 'Valid price is required';
    if (!form.deliveryTime.trim()) newErrors.deliveryTime = 'Delivery time is required';
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
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    images.forEach((img) => formData.append('portfolioImages', img));
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Service Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Professional Logo Design"
        error={errors.title}
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe your service in detail..."
        rows={5}
        error={errors.description}
        required
      />

      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={CATEGORY_OPTIONS}
        error={errors.category}
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
          label="Delivery Time"
          name="deliveryTime"
          value={form.deliveryTime}
          onChange={handleChange}
          placeholder="e.g. 3-5 days"
          error={errors.deliveryTime}
          required
        />
      </div>

      <Input
        label="Tags (comma separated)"
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="e.g. logo, design, branding"
      />

      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        fontWeight: 500,
      }}>
        <input
          type="checkbox"
          name="availability"
          checked={form.availability}
          onChange={handleChange}
        />
        Currently Available
      </label>

      <ImageUpload
        label="Portfolio Images (Max 5)"
        multiple
        maxFiles={5}
        onChange={setImages}
      />

      <Button type="submit" loading={loading} fullWidth size="lg">
        {initialValues.title ? 'Update Service' : 'Post Service'}
      </Button>
    </form>
  );
};

export default ServiceForm;