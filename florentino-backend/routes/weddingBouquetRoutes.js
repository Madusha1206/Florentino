const express = require('express');
const router = express.Router();
const WeddingBouquet = require('../models/WeddingBouquet');

router.post('/', async (req, res) => {
  try {
    const bouquet = new WeddingBouquet(req.body);
    await bouquet.save();
    res.status(201).json(bouquet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const bouquets = await WeddingBouquet.find();
  res.json(bouquets);
});

router.get('/:id', async (req, res) => {
  const bouquet = await WeddingBouquet.findById(req.params.id);
  if (!bouquet) return res.status(404).json({ error: 'Not found' });
  res.json(bouquet);
});

router.put('/:id', async (req, res) => {
  const bouquet = await WeddingBouquet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bouquet);
});

router.delete('/:id', async (req, res) => {
  await WeddingBouquet.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
