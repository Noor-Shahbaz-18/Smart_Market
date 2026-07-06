import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import { formatDate } from '../../../utils/formatDate';
import { getStatusColor } from '../../../utils/helpers';

const ListingTable = ({ listings = [], type }) => {
  if (listings.length === 0) {
    return <p style={{ color: 'var(--gray)', padding: '1rem 0' }}>No listings found</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '1.5px solid var(--border)' }}>
            {['Title', 'Price', 'Status', 'Seller', 'Date'].map((h) => (
              <th key={h} style={{
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--gray)',
                textTransform: 'uppercase',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listings.map((item) => (
            <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.88rem', fontWeight: 500 }}>
                {item.title}
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.88rem' }}>
                {formatPrice(item.price)}
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span style={{
                  background: getStatusColor(item.status),
                  color: 'white',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--gray)' }}>
                {item.seller?.name || item.provider?.name}
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', color: 'var(--gray)' }}>
                {formatDate(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;