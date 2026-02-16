import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, default: "General" },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
