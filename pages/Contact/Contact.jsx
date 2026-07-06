import React, { useState } from 'react';
import Input from '../../components/common/Input/Input';
import TextArea from '../../components/common/Input/TextArea';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`container page-padding ${styles.contact}`}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.info}>
          <h3>Get In Touch</h3>
          <div className={styles.infoItem}>
            <span>📧</span>
            <div>
              <strong>Email</strong>
              <p>support@smartmarket.com</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span>📞</span>
            <div>
              <strong>Phone</strong>
              <p>+92 300 1234567</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span>📍</span>
            <div>
              <strong>Location</strong>
              <p>Lahore, Pakistan</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" required />
          <TextArea label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Write your message..." rows={5} required />
          <Button type="submit" loading={loading} fullWidth>Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;