import mongoose from "mongoose";
import dotenv from "dotenv";
import Equipment from "./models/Equipment.js";

dotenv.config();

const equipment = [
  { name: "Tractor", description: "Farm tractor for plowing and cultivation", price: 350000, category: "Machinery" },
  { name: "Plough", description: "Heavy-duty steel plough for soil preparation", price: 8500, category: "Tools" },
  { name: "Seed Drill", description: "Precision seed sowing machine", price: 45000, category: "Machinery" },
  { name: "Harvesting Sickle", description: "Stainless steel harvesting sickle", price: 350, category: "Tools" },
  { name: "Spray Pump", description: "16L battery-operated spray pump for pesticides", price: 2200, category: "Equipment" },
  { name: "Water Pump", description: "Diesel water pump for irrigation", price: 12500, category: "Irrigation" },
  { name: "Cultivator", description: "Multi-purpose cultivator for weeding", price: 18000, category: "Machinery" },
  { name: "Thresher", description: "Grain threshing machine", price: 55000, category: "Machinery" },
  { name: "Fertilizer Spreader", description: "Manual fertilizer spreader", price: 2800, category: "Equipment" },
  { name: "Fencing Wire", description: "100m galvanized agricultural fencing wire", price: 1200, category: "Supplies" }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const count = await Equipment.countDocuments();
  if (count === 0) {
    await Equipment.insertMany(equipment);
    console.log("Seeded", equipment.length, "equipment items");
  } else {
    console.log("Equipment already exists, skipping seed");
  }
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
