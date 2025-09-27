const mongoose = require('mongoose');

const occasionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  location: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Occasion', occasionSchema);
