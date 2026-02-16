import Equipment from "../models/Equipment.js";

export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({ inStock: true }).sort({ createdAt: -1 });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
