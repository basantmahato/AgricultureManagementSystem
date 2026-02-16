import express from "express";
import { getAllEquipment } from "../controllers/equipmentController.js";

const router = express.Router();
router.get("/", getAllEquipment);

export default router;
