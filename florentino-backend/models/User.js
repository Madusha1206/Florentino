const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // new
  lastName: { type: String, required: true },  // new
  email: { type: String, required: true, unique: true },
  phone: { type: String }, // optional
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
