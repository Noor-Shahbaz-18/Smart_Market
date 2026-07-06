export const formatPrice = (price) => `Rs. ${Number(price).toLocaleString()}`;

export const truncate = (text, length = 100) =>
  text.length > length ? text.slice(0, length) + '...' : text;

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';