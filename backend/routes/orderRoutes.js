import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = express.Router();

router.post("/", optionalAuth, createOrder);
router.get("/my", authMiddleware, getMyOrders);

export default router;
