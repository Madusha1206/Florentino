// const express = require('express');
// const router = express.Router();
// const giftController = require('../controllers/giftController');

// router.post('/', giftController.createGift);
// router.get('/', giftController.getGifts);
// router.get('/:id', giftController.getGiftById);
// router.put('/:id', giftController.updateGift);
// router.delete('/:id', giftController.deleteGift);

// module.exports = router;
const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift');

// Create
router.post('/', async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const gifts = await Gift.find();
  res.json(gifts);
});

// Read one
router.get('/:id', async (req, res) => {
  const gift = await Gift.findById(req.params.id);
  if (!gift) return res.status(404).json({ error: 'Not found' });
  res.json(gift);
});

// Update
router.put('/:id', async (req, res) => {
  const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(gift);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Gift.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
