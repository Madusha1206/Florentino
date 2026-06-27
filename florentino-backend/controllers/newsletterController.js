const NewsletterSubscriber = require("../models/NewsletterSubscriber");

exports.subscribe = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const source = req.body.source || "footer";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email },
      {
        email,
        source,
        active: true,
        updatedAt: new Date(),
        $setOnInsert: { subscribedAt: new Date() },
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Subscribed for new item updates and offers.",
      subscriber,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ updatedAt: -1 });
    res.json({ success: true, subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
