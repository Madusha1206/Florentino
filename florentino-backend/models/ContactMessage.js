const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  comment: { type: String, required: true, trim: true },
  source: { type: String, default: "contact-page", trim: true },
  status: {
    type: String,
    enum: ["new", "read", "replied", "archived"],
    default: "new",
  },
  userAgent: { type: String, default: "", trim: true },
  readAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
