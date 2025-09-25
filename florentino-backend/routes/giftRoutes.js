const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

router.post('/', giftController.createGift);
router.get('/', giftController.getGifts);
router.get('/:id', giftController.getGiftById);
router.put('/:id', giftController.updateGift);
router.delete('/:id', giftController.deleteGift);

module.exports = router;
