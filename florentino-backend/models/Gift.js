const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gift', giftSchema);
