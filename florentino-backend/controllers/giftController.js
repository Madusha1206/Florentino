const Gift = require('../models/Gift');

// Create a new gift
exports.createGift = async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all gifts
exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single gift by ID
exports.getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.json(gift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a gift
exports.updateGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.json(gift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a gift
exports.deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.json({ message: 'Gift deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
