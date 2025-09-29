const Gift = require('../models/Gift');

// Create a new gift
exports.createGift = async (req, res) => {
  try {
    const { name, image, description, price, rating } = req.body;

    const gift = new Gift({
      name,
      image,
      description,
      price,   // ✅ now defined
      rating: rating || 4
    });

    await gift.save();
    res.status(201).json({ success: true, gift });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// Get all gifts
exports.getGifts = async (req, res) => {
  try {
    const gifts = await Gift.find().sort({ createdAt: -1 }); // latest first
    res.json({ success: true, gifts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single gift by ID
exports.getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ success: false, error: 'Gift not found' });
    res.json({ success: true, gift });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a gift
exports.updateGift = async (req, res) => {
  try {
    const { name, image, description, rating } = req.body;
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      { name, image, description, rating },
      { new: true }
    );
    if (!gift) return res.status(404).json({ success: false, error: 'Gift not found' });
    res.json({ success: true, gift });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a gift
exports.deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);
    if (!gift) return res.status(404).json({ success: false, error: 'Gift not found' });
    res.json({ success: true, message: 'Gift deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
