import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import ReportItem from './ReportItem';
import Spinner from '../../common/Loader/Spinner';
import styles from './ReportedContent.module.css';

const ReportedContent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await adminApi.getReports();
      setReports(res.data.reports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await adminApi.updateReport(id, status);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Reported Content</h1>
        <p>Review and resolve reported content</p>
      </div>

      {loading ? (
        <Spinner />
      ) : reports.length === 0 ? (
        <div className={styles.empty}>
          <p>✅ No pending reports</p>
        </div>
      ) : (
        <div className={styles.list}>
          {reports.map((report) => (
            <ReportItem key={report._id} report={report} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedContent;