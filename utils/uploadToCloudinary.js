const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Upload single image
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'smart-marketplace');

  const res = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return data.secure_url;
};

// Upload multiple images
export const uploadMultipleToCloudinary = async (files) => {
  const uploads = Array.from(files).map((file) => uploadToCloudinary(file));
  return await Promise.all(uploads);
};

// Validate image before upload
export const validateImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only jpg, jpeg, png, webp allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be under 5MB' };
  }

  return { valid: true, error: null };
};

// Preview image before upload
export const previewImage = (file) => URL.createObjectURL(file);

// Revoke preview URL to free memory
export const revokePreview = (url) => URL.revokeObjectURL(url);