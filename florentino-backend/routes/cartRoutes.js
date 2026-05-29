const express = require("express");
const router = express.Router();
const { addToCart, getCart, syncCart, updateCartItem, deleteCartItem } = require("../controllers/cartController");

router.post("/", addToCart);
router.post("/sync", syncCart);
router.get("/", getCart);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
