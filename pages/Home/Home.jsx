import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import FeaturedServices from './FeaturedServices';
import CategoryGrid from './CategoryGrid';
import { productApi } from '../../api/productApi';
import { serviceApi } from '../../api/serviceApi';
import styles from './Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          productApi.getAll({ limit: 8, sort: '-createdAt' }),
          serviceApi.getAll({ limit: 8, sort: '-createdAt' }),
        ]);
        setProducts(pRes.data.data);
        setServices(sRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts products={products} loading={loading} />
      <FeaturedServices services={services} loading={loading} />
    </div>
  );
};

export default Home;