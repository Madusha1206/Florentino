const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, deliveryNote, items, total } = req.body;

    if (!customerName?.trim() || !customerPhone?.trim()) {
      return res.status(400).json({ success: false, message: "Name and phone are required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must include at least one item" });
    }

    const order = new Order({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryNote: deliveryNote?.trim() || "",
      items,
      total: total || 0,
    });

    await order.save();
    res.status(201).json({ success: true, message: "Order saved", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrders = async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
