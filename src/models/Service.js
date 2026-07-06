const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
  availability: { type: Boolean, default: true },
  portfolioImages: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive', 'pending', 'rejected'], default: 'pending' },
  ratings: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  tags: [{ type: String }],
}, { timestamps: true });

serviceSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Service', serviceSchema);