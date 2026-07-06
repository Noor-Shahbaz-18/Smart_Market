import React, { useState, useRef } from 'react';
import { validateImage, previewImage, revokePreview } from '../../../utils/uploadToCloudinary';
import ImagePreview from './ImagePreview';
import styles from './ImageUpload.module.css';

const ImageUpload = ({
  multiple = false,
  maxFiles = 5,
  onChange,
  label = 'Upload Images',
  existingImages = [],
}) => {
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    setError('');
    const fileArray = Array.from(files);

    if (multiple && fileArray.length + previews.length > maxFiles) {
      setError(`Max ${maxFiles} images allowed`);
      return;
    }

    const validated = [];
    for (const file of fileArray) {
      const { valid, error: err } = validateImage(file);
      if (!valid) {
        setError(err);
        return;
      }
      validated.push({ file, url: previewImage(file) });
    }

    const updated = multiple ? [...previews, ...validated] : validated;
    setPreviews(updated);
    onChange(updated.map((p) => p.file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    revokePreview(previews[index].url);
    setPreviews(updated);
    onChange(updated.map((p) => p.file));
  };

  const hasNewSelection = previews.length > 0;

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Existing images (already saved on this listing) */}
      {existingImages.length > 0 && !hasNewSelection && (
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
            Current images — uploading new ones below will replace these
          </p>
          <div className={styles.previewGrid}>
            {existingImages.map((url, i) => (
              <div
                key={i}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                }}
              >
                <img
                  src={url}
                  alt={`current ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={styles.dropZone}
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <span className={styles.icon}>📁</span>
        <p>Click or drag & drop images here</p>
        <p className={styles.hint}>JPG, PNG, WEBP — Max 5MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* New previews */}
      {previews.length > 0 && (
        <div className={styles.previewGrid}>
          {previews.map((p, i) => (
            <ImagePreview
              key={i}
              url={p.url}
              onRemove={() => removeImage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
