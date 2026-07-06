import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import { favoriteApi } from '../../api/favoriteApi';
import { useAuth } from '../../hooks/useAuth';
import ProductImages from '../../components/products/ProductDetail/ProductImages';
import ProductInfo from '../../components/products/ProductDetail/ProductInfo';
import ReviewList from '../../components/reviews/ReviewList/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm/ReviewForm';
import Spinner from '../../components/common/Loader/Spinner';
import Button from '../../components/common/Button/Button';
import { formatPrice } from '../../utils/formatters';
import { getAvatar, isOwner } from '../../utils/helpers';
import { chatApi } from '../../api/chatApi';
import toast from 'react-hot-toast';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await productApi.getOne(id);
      setProduct(res.data.product);
    } catch {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    if (!user) return navigate('/login');
    try {
      const res = await chatApi.createOrGet(product.seller._id);
      navigate('/messages', { state: { conversationId: res.data.conversation._id } });
    } catch {
      toast.error('Could not start conversation');
    }
  };

  const handleFavorite = async () => {
    if (!user) return navigate('/login');
    try {
      if (isFav) {
        await favoriteApi.remove(product._id);
        setIsFav(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteApi.add({ targetType: 'product', targetId: product._id });
        setIsFav(true);
        toast.success('Added to favorites');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productApi.delete(id);
      toast.success('Product deleted');
      navigate('/products');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Spinner />;
  if (!product) return null;

  const mine = isOwner(product, user?._id);

  return (
    <div className={`container page-padding ${styles.page}`}>
      <div className={styles.grid}>
        <ProductImages images={product.images} title={product.title} />

        <div className={styles.details}>
          <ProductInfo product={product} />

          <div className={styles.actions}>
            {!mine && (
              <>
                <Button onClick={handleMessage} fullWidth>💬 Message Seller</Button>
                <Button
                  variant={isFav ? 'danger' : 'outline'}
                  onClick={handleFavorite}
                  fullWidth
                >
                  {isFav ? '❤️ Remove Favorite' : '🤍 Save Favorite'}
                </Button>
              </>
            )}
            {mine && (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/products/${id}/edit`)}
                  fullWidth
                >
                  ✏️ Edit Product
                </Button>
                <Button variant="danger" onClick={handleDelete} fullWidth>
                  🗑️ Delete Product
                </Button>
              </>
            )}
          </div>

          {/* Seller Info */}
          <div className={styles.sellerCard}>
            <h4>Seller Info</h4>
            <div
              className={styles.sellerRow}
              onClick={() => navigate(`/profile/${product.seller._id}`)}
            >
              <img
                src={getAvatar(product.seller.avatar, product.seller.name)}
                alt={product.seller.name}
                className={styles.sellerAvatar}
              />
              <div>
                <p className={styles.sellerName}>{product.seller.name}</p>
                {product.seller.location && (
                  <p className={styles.sellerLocation}>📍 {product.seller.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {user && !mine && (
          <ReviewForm
            targetType="product"
            targetId={id}
            onSuccess={fetchProduct}
          />
        )}
        <ReviewList targetType="product" targetId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;