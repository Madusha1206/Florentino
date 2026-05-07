const express = require('express');
const router = express.Router();

const {
  createGift,
  getGifts,
  getGiftById,
  updateGift,
  deleteGift,
} = require('../controllers/giftController');

// GET /api/gifts -> list all gifts
router.get('/', getGifts);

// POST /api/gifts -> create a gift
router.post('/', createGift);

// GET /api/gifts/:id -> get single gift
router.get('/:id', getGiftById);

// PUT /api/gifts/:id -> update a gift
router.put('/:id', updateGift);

// DELETE /api/gifts/:id -> delete a gift
router.delete('/:id', deleteGift);

module.exports = router;
