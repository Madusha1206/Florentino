const mongoose = require("mongoose");

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  source: {
    type: String,
    default: "footer",
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
