import React, { useState } from 'react';
import { userApi } from '../../../api/userApi';
import { useAuth } from '../../../hooks/useAuth';
import { getAvatar } from '../../../utils/helpers';
import toast from 'react-hot-toast';

const ProfilePicture = ({ user }) => {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    try {
      const res = await userApi.updateProfile(formData);
      updateUser(res.data.user);
      toast.success('Profile picture updated!');
    } catch {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={getAvatar(user?.avatar, user?.name)}
        alt={user?.name}
        style={{
          width: 100, height: 100,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid var(--border)',
        }}
      />
      <label style={{
        position: 'absolute', bottom: 0, right: 0,
        background: 'var(--primary)', color: 'white',
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '0.85rem',
        border: '2px solid white',
      }}>
        {loading ? '...' : '✏️'}
        <input type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
      </label>
    </div>
  );
};

export default ProfilePicture;