import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder = 'Search products or services...', onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 400);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/products?search=${query}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>🔍 Search</button>
    </form>
  );
};

export default SearchBar;