import Order from "../models/Order.js";
import Equipment from "../models/Equipment.js";

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, mobile, customerName, customerEmail } = req.body;
    if (!items?.length || !shippingAddress || !mobile) {
      return res.status(400).json({ message: "Items, address and mobile are required" });
    }

    const populatedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const eq = await Equipment.findById(item.equipmentId);
      if (!eq) return res.status(404).json({ message: `Equipment ${item.equipmentId} not found` });
      const qty = Math.max(1, parseInt(item.quantity) || 1);
      populatedItems.push({
        equipment: eq._id,
        name: eq.name,
        price: eq.price,
        quantity: qty
      });
      totalAmount += eq.price * qty;
    }

    const order = await Order.create({
      user: req.user?.userId || null,
      items: populatedItems,
      totalAmount,
      shippingAddress,
      mobile,
      customerName: customerName || req.user?.name,
      customerEmail: customerEmail || req.user?.email,
      paymentMethod: "COD"
    });

    const populated = await Order.findById(order._id).populate("items.equipment", "name price");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    if (!req.user?.userId) return res.json([]);
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.equipment", "name price image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
