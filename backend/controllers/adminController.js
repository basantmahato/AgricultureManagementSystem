import User from "../models/User.js";
import Task from "../models/Task.js";
import SoilBooking from "../models/SoilBooking.js";
import Order from "../models/Order.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("user", "name email location")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const pendingTasks = await Task.countDocuments({ status: { $in: ["pending", "in-progress"] } });

    const totalSoilBookings = await SoilBooking.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      users: totalUsers,
      admins: totalAdmins,
      totalTasks,
      completedTasks,
      pendingTasks,
      totalSoilBookings,
      totalOrders
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSoilBookings = async (req, res) => {
  try {
    const bookings = await SoilBooking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSoilStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const booking = await SoilBooking.findByIdAndUpdate(
      req.params.id,
      { status: status || undefined, adminNotes: adminNotes !== undefined ? adminNotes : undefined },
      { new: true }
    )
      .populate("user", "name email");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.equipment", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status || undefined },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.equipment", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
