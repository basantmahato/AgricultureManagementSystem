import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { getMongoUri } from "./loadEnv.js";
import Equipment from "./models/Equipment.js";

/* Image URLs: topic-matched Unsplash photos (tractor, plow, seeding, etc.). */
const equipment = [
  {
    name: "Tractor",
    description: "Farm tractor for plowing and cultivation",
    price: 350000,
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1651933084801-b18446ff2070?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Plough",
    description: "Heavy-duty steel plough for soil preparation",
    price: 8500,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1672664214886-8c2a0affa18c?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Seed Drill",
    description: "Precision seed sowing machine",
    price: 45000,
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1706862609885-7771b001daa2?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Harvesting Sickle",
    description: "Stainless steel harvesting sickle",
    price: 350,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1768729340317-4f3eb9eb0858?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Spray Pump",
    description: "16L battery-operated spray pump for pesticides",
    price: 2200,
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1755931359594-852c73c6609c?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Water Pump",
    description: "Diesel water pump for irrigation",
    price: 12500,
    category: "Irrigation",
    image:
      "https://images.unsplash.com/photo-1764697761858-e126b8c7aaa6?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Cultivator",
    description: "Multi-purpose cultivator for weeding",
    price: 18000,
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1773919688039-5dc180e4ba6c?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Thresher",
    description: "Grain threshing machine",
    price: 55000,
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1635174815469-6efd052297d4?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Fertilizer Spreader",
    description: "Manual fertilizer spreader",
    price: 2800,
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1717992574165-63da690f5ce0?w=900&q=80&auto=format&fit=crop"
  },
  {
    name: "Fencing Wire",
    description: "100m galvanized agricultural fencing wire",
    price: 1200,
    category: "Supplies",
    image:
      "https://images.unsplash.com/photo-1571113673572-cb077b649a55?w=900&q=80&auto=format&fit=crop"
  }
];

function isMainModule() {
  const thisFile = fileURLToPath(import.meta.url);
  const entry = process.argv[1];
  return Boolean(entry && path.resolve(entry) === path.resolve(thisFile));
}

export async function seedEquipment(options = {}) {
  const force = Boolean(options.force);
  if (force) {
    const { deletedCount } = await Equipment.deleteMany({});
    console.log(`Equipment: removed ${deletedCount} existing documents`);
  } else {
    const count = await Equipment.countDocuments();
    if (count > 0) {
      console.log("Equipment: collection not empty, skipping (use --force or seed:all --force to replace)");
      return;
    }
  }
  await Equipment.insertMany(equipment);
  console.log("Equipment: inserted", equipment.length, "items");
}

async function runCli() {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    console.error("Set MONGO_URI or MONGODB_URI in backend/.env");
    process.exit(1);
  }
  const force = process.argv.includes("--force");
  await mongoose.connect(mongoUri);
  await seedEquipment({ force });
  await mongoose.disconnect();
  process.exit(0);
}

if (isMainModule()) {
  runCli().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
