import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import soilRoutes from "./routes/soilRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/admin", adminRoutes);
app.use("/soil", soilRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;
