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

exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, ...rest } = req.body;

    if (quantity !== undefined && quantity <= 0) {
      await Cart.findByIdAndDelete(id);
      return res.json({ success: true, deleted: true });
    }

    const updates = { ...rest };
    if (quantity !== undefined) updates.quantity = quantity;

    const cartItem = await Cart.findByIdAndUpdate(id, updates, { new: true });
    if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.json({ success: true, cartItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
