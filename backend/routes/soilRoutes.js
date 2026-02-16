import express from "express";
import { createSoilBooking, getMySoilBookings } from "../controllers/soilController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadSoilPhotos } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", uploadSoilPhotos, createSoilBooking);
router.get("/", getMySoilBookings);

export default router;
