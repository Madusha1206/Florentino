const express = require('express');
const router = express.Router();
const Occasion = require('../models/Occasion');

router.post('/', async (req, res) => {
  try {
    const occasion = new Occasion(req.body);
    await occasion.save();
    res.status(201).json(occasion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const occasions = await Occasion.find();
  res.json(occasions);
});

router.get('/:id', async (req, res) => {
  const occasion = await Occasion.findById(req.params.id);
  if (!occasion) return res.status(404).json({ error: 'Not found' });
  res.json(occasion);
});

router.put('/:id', async (req, res) => {
  const occasion = await Occasion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(occasion);
});

router.delete('/:id', async (req, res) => {
  await Occasion.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
