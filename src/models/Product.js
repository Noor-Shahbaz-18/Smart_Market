const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  images: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, default: '' },
  condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'new' },
  status: { type: String, enum: ['active', 'sold', 'pending', 'rejected'], default: 'pending' },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);