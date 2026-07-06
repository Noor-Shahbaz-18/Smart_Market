// Generate star array for rating display
export const generateStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= Math.round(rating) ? 'full' : 'empty');
  }
  return stars;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colors = {
    active: '#10b981',
    pending: '#f59e0b',
    rejected: '#ef4444',
    sold: '#6b7280',
    accepted: '#10b981',
    cancelled: '#ef4444',
    completed: '#2563eb',
    inactive: '#6b7280',
  };
  return colors[status] || '#6b7280';
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Get initials from name (for avatar fallback)
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Scroll to top
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Build query string from object
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value);
    }
  });
  return query.toString();
};

// Check if user is owner of a listing
export const isOwner = (listing, userId) => {
  const ownerId = listing?.seller?._id || listing?.provider?._id;
  return ownerId?.toString() === userId?.toString();
};

// Get avatar url or fallback
export const getAvatar = (avatar, name) => {
  if (avatar) return avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=2563eb&color=fff`;
};

// Clamp number between min and max
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Deep clone object
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Check if object is empty
export const isEmpty = (obj) => Object.keys(obj).length === 0;

// Group array by key
export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
};

// Debounce function (standalone, not hook version)
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Sort array of objects by key
export const sortBy = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (order === 'asc') return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
};

// Get notification icon based on type
export const getNotificationIcon = (type) => {
  const icons = {
    booking_request: '📅',
    booking_update: '🔄',
    new_message: '💬',
    new_review: '⭐',
    listing_approval: '✅',
  };
  return icons[type] || '🔔';
};

// Format booking time slot
export const formatTimeSlot = (date, time) => {
  const d = new Date(date);
  return `${d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${time}`;
};