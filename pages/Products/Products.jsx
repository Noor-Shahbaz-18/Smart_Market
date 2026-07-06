import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import ProductGrid from '../../components/Products/ProductList/ProductGrid';
import ProductFilters from '../../components/Products/ProductList/ProductFilters';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Pagination from '../../components/common/Pagination/Pagination';
import Spinner from '../../components/common/Loader/Spinner';
import styles from './Products.module.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const condition = searchParams.get('condition') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll({
        page, search, category, minPrice, maxPrice, condition, sort, limit: 12,
      });
      setProducts(res.data.data);
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
        <h1 className={styles.title}>Products Marketplace</h1>
        <SearchBar
          placeholder="Search products..."
          onSearch={(q) => updateParam('search', q)}
        />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ProductFilters
            filters={{ category, minPrice, maxPrice, condition, sort }}
            onFilterChange={updateParam}
          />
        </aside>

        <main className={styles.main}>
          <div className={styles.resultsBar}>
            <p className={styles.count}>
              {pagination.total || 0} products found
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
              <option value="-views">Most Viewed</option>
            </select>
          </div>

          {loading ? (
            <Spinner />
          ) : products.length === 0 ? (
            <div className={styles.empty}>
              <p>😕 No products found</p>
              <small>Try adjusting your filters</small>
            </div>
          ) : (
            <ProductGrid products={products} />
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

export default Products;