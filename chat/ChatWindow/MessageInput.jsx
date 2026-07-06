import React, { useState, useRef } from 'react';
import styles from './MessageInput.module.css';

const MessageInput = ({ onSend, onTyping }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const fileRef = useRef(null);

  const handleChange = (e) => {
    setContent(e.target.value);
    onTyping?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSend = () => {
    if (!content.trim() && !imageFile) return;
    onSend(content, imageFile);
    setContent('');
    setImageFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      {/* Image Preview */}
      {preview && (
        <div className={styles.imagePreview}>
          <img src={preview} alt="preview" className={styles.previewImg} />
          <button onClick={removeImage} className={styles.removeImg}>✕</button>
        </div>
      )}

      <div className={styles.inputRow}>
        {/* Image Upload Button */}
        <button
          onClick={() => fileRef.current?.click()}
          className={styles.iconBtn}
          title="Share image"
        >
          📷
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImage}
        />

        {/* Text Input */}
        <textarea
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className={styles.input}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!content.trim() && !imageFile}
          className={styles.sendBtn}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MessageInput;