const Gift = require("../models/Gift");

exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find().sort({ createdAt: -1 });
    res.json({ success: true, gifts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createGift = async (req, res) => {
  try {
    const { name, description, price, image, rating } = req.body;
    const gift = new Gift({ name, description, price, image, rating });
    await gift.save();
    res.status(201).json({ success: true, gift });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateGift = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const gift = await Gift.findByIdAndUpdate(id, updates, { new: true });
    if (!gift) {
      return res.status(404).json({ success: false, error: "Gift not found" });
    }
    res.json({ success: true, gift });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteGift = async (req, res) => {
  try {
    const { id } = req.params;
    const gift = await Gift.findByIdAndDelete(id);
    if (!gift) {
      return res.status(404).json({ success: false, error: "Gift not found" });
    }
    res.json({ success: true, message: "Gift deleted" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
