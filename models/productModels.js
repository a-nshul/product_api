const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isRecommended: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  status: { type: String, enum: ['available', 'out-of-stock'], default: 'available' },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
