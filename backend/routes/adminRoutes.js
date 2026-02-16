import express from "express";
import { getAllUsers, getAllTasks, getAdminStats, getAllSoilBookings, updateSoilStatus, getAllOrders, updateOrderStatus } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/users", getAllUsers);
router.get("/tasks", getAllTasks);
router.get("/stats", getAdminStats);
router.get("/soil", getAllSoilBookings);
router.put("/soil/:id/status", updateSoilStatus);
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

export default router;
