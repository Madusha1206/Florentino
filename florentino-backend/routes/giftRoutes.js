const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

// CRUD routes
router.post('/', giftController.createGift);     // Create
router.get('/', giftController.getGifts);       // Read all
router.get('/:id', giftController.getGiftById); // Read one
router.put('/:id', giftController.updateGift);  // Update
router.delete('/:id', giftController.deleteGift); // Delete

module.exports = router;
