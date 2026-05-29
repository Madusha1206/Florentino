const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  giftId: { type: String, required: true },  // Changed to String (no ref)
  name: String,
  category: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);
