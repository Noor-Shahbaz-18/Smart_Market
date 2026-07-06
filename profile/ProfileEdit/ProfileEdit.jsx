import React, { useState } from 'react';
import { userApi } from '../../../api/userApi';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../common/Input/Input';
import TextArea from '../../common/Input/TextArea';
import Button from '../../common/Button/Button';
import ImageUpload from '../../common/ImageUpload/ImageUpload';
import toast from 'react-hot-toast';
import styles from './ProfileEdit.module.css';

const ProfileEdit = ({ user, onSuccess, onCancel }) => {
  const { updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name || '',
    bio: user.bio || '',
    phone: user.phone || '',
    location: user.location || '',
    skills: user.skills?.join(', ') || '',
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [pwLoading, setPwLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (avatar) formData.append('avatar', avatar);

      const res = await userApi.updateProfile(formData);
      updateUser(res.data.user);
      toast.success('Profile updated!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmNewPassword) {
      return toast.error('Passwords do not match');
    }
    setPwLoading(true);
    try {
      await userApi.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Edit Profile</h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>← Cancel</Button>
      </div>

      {/* Profile Form */}
      <div className={styles.section}>
        <h3>Personal Information</h3>
        <form onSubmit={handleSubmit}>
          <ImageUpload
            label="Profile Picture"
            multiple={false}
            onChange={(files) => setAvatar(files[0])}
          />
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <TextArea label="Bio" name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Tell others about yourself..." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" />
            <Input label="Location" name="location" value={form.location} onChange={handleChange} placeholder="Lahore, Pakistan" />
          </div>
          <Input label="Skills (comma separated)" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Design..." />
          <Button type="submit" loading={loading} fullWidth>Save Changes</Button>
        </form>
      </div>

      {/* Password Form */}
      <div className={styles.section}>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <Input label="Current Password" name="currentPassword" type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} required />
          <Input label="New Password" name="newPassword" type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} required />
          <Input label="Confirm New Password" name="confirmNewPassword" type="password" value={pwForm.confirmNewPassword} onChange={(e) => setPwForm({ ...pwForm, confirmNewPassword: e.target.value })} required />
          <Button type="submit" loading={pwLoading} variant="outline" fullWidth>Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;