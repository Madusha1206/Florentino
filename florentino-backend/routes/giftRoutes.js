const express = require("express");
const router = express.Router();
const { getGifts, createGift } = require("../controllers/giftController");

router.get("/", getGifts);
router.post("/", createGift);

module.exports = router;