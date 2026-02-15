import Task from "../models/Task.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    const tasks = await Task.find({ user: userId });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;

    // 🔥 Calculate total estimated cost
    const totalEstimatedCost = tasks.reduce(
      (sum, task) => sum + (task.estimatedCost || 0),
      0
    );

    res.json({
      user,
      stats: {
        total,
        completed,
        pending: total - completed
      },
      finance: {
        totalEstimatedCost
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
