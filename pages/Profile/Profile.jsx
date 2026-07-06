import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useAuth } from '../../hooks/useAuth';
import UserProfile from '../../components/profile/UserProfile/UserProfile';
import ProfileEdit from '../../components/profile/ProfileEdit/ProfileEdit';
import ProductGrid from '../../components/Products/ProductList/ProductGrid';
import ServiceGrid from '../../components/services/ServiceList/ServiceGrid';
import ReviewList from '../../components/reviews/ReviewList/ReviewList';
import Chat from '../../components/chat/Chat/Chat';
import Spinner from '../../components/common/Loader/Spinner';
import Button from '../../components/common/Button/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('products');
  const [editMode, setEditMode] = useState(false);

  const isOwn = currentUser?._id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await userApi.getProfile(id);
      setProfileData(res.data);
    } catch {
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!profileData) return null;

  const { user, products, services, reviews } = profileData;

  if (editMode) {
    return (
      <div className={`container page-padding`}>
        <ProfileEdit
          user={user}
          onSuccess={() => {
            setEditMode(false);
            fetchProfile();
          }}
          onCancel={() => setEditMode(false)}
        />
      </div>
    );
  }

  return (
    <div className={`container page-padding ${styles.page}`}>
      <div className={styles.layout}>

        {/* Left: Profile Card */}
        <aside className={styles.sidebar}>
          <UserProfile user={user} />

          <div className={styles.sidebarActions}>
            {isOwn ? (
              <Button fullWidth onClick={() => setEditMode(true)}>
                ✏️ Edit Profile
              </Button>
            ) : (
              currentUser && (
                <Chat
                  targetUserId={user._id}
                  targetUserName={user.name}
                />
              )
            )}
          </div>
        </aside>

        {/* Right: Tabs */}
        <main className={styles.main}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'products' ? styles.active : ''}`}
              onClick={() => setTab('products')}
            >
              📦 Products ({products.length})
            </button>
            <button
              className={`${styles.tab} ${tab === 'services' ? styles.active : ''}`}
              onClick={() => setTab('services')}
            >
              🛠️ Services ({services.length})
            </button>
            <button
              className={`${styles.tab} ${tab === 'reviews' ? styles.active : ''}`}
              onClick={() => setTab('reviews')}
            >
              ⭐ Reviews ({reviews.length})
            </button>
          </div>

          <div className={styles.tabContent}>
            {tab === 'products' && (
              products.length === 0
                ? <p className={styles.empty}>No products listed</p>
                : <ProductGrid products={products} />
            )}
            {tab === 'services' && (
              services.length === 0
                ? <p className={styles.empty}>No services offered</p>
                : <ServiceGrid services={services} />
            )}
            {tab === 'reviews' && (
              <ReviewList targetType="user" targetId={id} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;