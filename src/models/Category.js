const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  type: { type: String, enum: ['product', 'service', 'both'], default: 'both' },
  icon: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);