const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  code: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, default: 0 },
  category: { type: String, default: "" },
  image: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  deliveryNote: { type: String, trim: true, default: "" },
  items: { type: [orderItemSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  source: { type: String, default: "whatsapp_cart" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
