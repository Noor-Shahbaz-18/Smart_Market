import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvatar } from '../../../utils/helpers';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ participant, onBack }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button onClick={onBack} className={styles.backBtn}>←</button>

      <img
        src={getAvatar(participant?.avatar, participant?.name)}
        alt={participant?.name}
        className={styles.avatar}
        onClick={() => navigate(`/profile/${participant?._id}`)}
      />

      <div className={styles.info}>
        <p className={styles.name}>{participant?.name || 'Unknown'}</p>
        <p className={styles.status}>Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;