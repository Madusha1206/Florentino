const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { giftId, name, price, image, quantity } = req.body;

    let cartItem = await Cart.findOne({ giftId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({ giftId, name, price, image, quantity: quantity || 1 });
      await cartItem.save();
    }

    res.status(201).json({ success: true, cartItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json({ success: true, cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};