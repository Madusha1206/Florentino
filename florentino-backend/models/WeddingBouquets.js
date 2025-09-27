const mongoose = require('mongoose');

const weddingBouquetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flowers: [String],
  price: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('WeddingBouquet', weddingBouquetSchema);
