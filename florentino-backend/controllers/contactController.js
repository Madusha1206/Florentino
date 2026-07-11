const ContactMessage = require("../models/ContactMessage");

exports.createMessage = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const comment = String(req.body.comment || "").trim();
    const source = String(req.body.source || "contact-page").trim();

    if (!name || !phone || !email || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address" });
    }

    const msg = new ContactMessage({
      name,
      phone,
      email,
      comment,
      source,
      userAgent: req.get("user-agent") || "",
    });
    await msg.save();
    res.status(201).json({ success: true, message: "Message received", data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Simple admin fetch (consider protecting this in production)
exports.getMessages = async (_req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
