const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { giftId, name, category, price, image, quantity } = req.body;

    let cartItem = await Cart.findOne({ giftId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      if (name !== undefined) cartItem.name = name;
      if (category !== undefined) cartItem.category = category;
      if (price !== undefined) cartItem.price = price;
      if (image !== undefined) cartItem.image = image;
      await cartItem.save();
    } else {
      cartItem = new Cart({ giftId, name, category, price, image, quantity: quantity || 1 });
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

exports.syncCart = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const cartItems = items
      .filter((item) => item && item.code && item.quantity > 0)
      .map((item) => ({
        giftId: item.code,
        name: item.name || item.code,
        category: item.category || "",
        price: item.price || 0,
        image: item.image || "",
        quantity: item.quantity,
      }));

    await Cart.deleteMany({});
    const savedItems = cartItems.length ? await Cart.insertMany(cartItems) : [];
    res.json({ success: true, cartItems: savedItems });
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
