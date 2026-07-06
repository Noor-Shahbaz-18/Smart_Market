import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const categories = [
  { icon: '🎨', name: 'Graphic Designing', type: 'service' },
  { icon: '💻', name: 'Web Development', type: 'service' },
  { icon: '📸', name: 'Photography', type: 'service' },
  { icon: '🏠', name: 'Home Services', type: 'service' },
  { icon: '📚', name: 'Tutoring', type: 'service' },
  { icon: '✍️', name: 'Content Writing', type: 'service' },
  { icon: '📱', name: 'Digital Marketing', type: 'service' },
  { icon: '🎬', name: 'Video Editing', type: 'service' },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Browse Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={styles.categoryCard}
              onClick={() => navigate(`/services?category=${cat.name}`)}
            >
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <p className={styles.categoryName}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;