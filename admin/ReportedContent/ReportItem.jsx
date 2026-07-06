import React from 'react';
import { getAvatar } from '../../../utils/helpers';
import { timeAgo } from '../../../utils/formatDate';
import Button from '../../common/Button/Button';
import styles from './ReportItem.module.css';

const ReportItem = ({ report, onUpdate }) => {
  const { _id, reporter, targetType, reason, createdAt } = report;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.reporter}>
          <img
            src={getAvatar(reporter?.avatar, reporter?.name)}
            alt={reporter?.name}
            className={styles.avatar}
          />
          <div>
            <p className={styles.name}>{reporter?.name}</p>
            <p className={styles.time}>{timeAgo(createdAt)}</p>
          </div>
        </div>
        <span className={styles.targetType}>{targetType}</span>
      </div>

      <div className={styles.reason}>
        <strong>Reason:</strong>
        <p>{reason}</p>
      </div>

      <div className={styles.actions}>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onUpdate(_id, 'resolved')}
        >
          ✅ Resolve
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onUpdate(_id, 'dismissed')}
        >
          ❌ Dismiss
        </Button>
      </div>
    </div>
  );
};

export default ReportItem;