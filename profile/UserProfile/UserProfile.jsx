import React from 'react';
import { getAvatar } from '../../../utils/helpers';
import RatingDisplay from '../../common/Rating/RatingDisplay';
import { formatDate } from '../../../utils/formatDate';
import styles from './UserProfile.module.css';

const UserProfile = ({ user }) => {
  const { name, avatar, bio, location, phone, skills, ratings, createdAt, isVerified } = user;

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={getAvatar(avatar, name)}
          alt={name}
          className={styles.avatar}
        />
        {isVerified && (
          <span className={styles.verifiedBadge} title="Verified">✓</span>
        )}
      </div>

      <h2 className={styles.name}>{name}</h2>

      <RatingDisplay
        rating={ratings?.average || 0}
        count={ratings?.count || 0}
      />

      {bio && <p className={styles.bio}>{bio}</p>}

      <div className={styles.details}>
        {location && (
          <div className={styles.detailItem}>
            <span>📍</span>
            <span>{location}</span>
          </div>
        )}
        {phone && (
          <div className={styles.detailItem}>
            <span>📞</span>
            <span>{phone}</span>
          </div>
        )}
        <div className={styles.detailItem}>
          <span>📅</span>
          <span>Joined {formatDate(createdAt)}</span>
        </div>
      </div>

      {skills?.length > 0 && (
        <div className={styles.skills}>
          <h4>Skills</h4>
          <div className={styles.skillTags}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;