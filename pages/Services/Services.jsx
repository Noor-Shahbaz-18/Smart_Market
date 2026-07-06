import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceApi } from '../../api/serviceApi';
import ServiceGrid from '../../components/services/ServiceList/ServiceGrid';
import ServiceFilters from '../../components/services/ServiceList/ServiceFilters';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Pagination from '../../components/common/Pagination/Pagination';
import Spinner from '../../components/common/Loader/Spinner';
import styles from './Services.module.css';

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const minRating = searchParams.get('minRating') || '';
  const availability = searchParams.get('availability') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  useEffect(() => {
    fetchServices();
  }, [searchParams]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await serviceApi.getAll({
        page, search, category, minPrice,
        maxPrice, minRating, availability, sort, limit: 12,
      });
      setServices(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries());
    if (value) params[key] = value;
    else delete params[key];
    params.page = 1;
    setSearchParams(params);
  };

  return (
    <div className={`container page-padding ${styles.page}`}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Services Marketplace</h1>
        <SearchBar
          placeholder="Search services..."
          onSearch={(q) => updateParam('search', q)}
        />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ServiceFilters
            filters={{ category, minPrice, maxPrice, minRating, availability, sort }}
            onFilterChange={updateParam}
          />
        </aside>

        <main className={styles.main}>
          <div className={styles.resultsBar}>
            <p className={styles.count}>
              {pagination.total || 0} services found
              {search && <span> for "<strong>{search}</strong>"</span>}
            </p>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className={styles.sortSelect}
            >
              <option value="-createdAt">Latest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratings.average">Top Rated</option>
            </select>
          </div>

          {loading ? (
            <Spinner />
          ) : services.length === 0 ? (
            <div className={styles.empty}>
              <p>😕 No services found</p>
              <small>Try adjusting your filters</small>
            </div>
          ) : (
            <ServiceGrid services={services} />
          )}

          <Pagination
            currentPage={page}
            totalPages={pagination.pages || 1}
            onPageChange={(p) => updateParam('page', p)}
          />
        </main>
      </div>
    </div>
  );
};

export default Services;