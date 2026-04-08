import mongoose from "mongoose";
import { getMongoUri } from "./loadEnv.js";
import { seedEquipment } from "./seedEquipment.js";
import { seedBlog } from "./seedBlog.js";
import { seedAdmin } from "./seedAdmin.js";

const force =
  process.argv.includes("--force") || process.env.SEED_FORCE === "1";

async function main() {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    console.error("Set MONGO_URI or MONGODB_URI in backend/.env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log(
    "Connected. Seeding admin, equipment, and blogs" +
      (force ? " (force: data reset where applicable)" : "") +
      "…"
  );

  await seedAdmin({ force });
  await seedEquipment({ force });
  await seedBlog({ force });

  await mongoose.disconnect();
  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
