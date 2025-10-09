const express = require("express");
const router = express.Router();
const { getGifts, createGift, updateGift, deleteGift } = require("../controllers/giftController");

router.get("/", getGifts);
router.post("/", createGift);
router.put("/:id", updateGift);
router.delete("/:id", deleteGift);

module.exports = router;
