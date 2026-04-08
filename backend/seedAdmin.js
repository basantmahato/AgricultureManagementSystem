import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { getMongoUri } from "./loadEnv.js";
import User from "./models/User.js";

function isMainModule() {
  const thisFile = fileURLToPath(import.meta.url);
  const entry = process.argv[1];
  return Boolean(entry && path.resolve(entry) === path.resolve(thisFile));
}

/**
 * Create or update a single admin user.
 * Set ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME in .env (recommended).
 * Defaults (dev only): admin@agrofarm.local / admin123
 */
export async function seedAdmin(options = {}) {
  const force = Boolean(options.force);
  const email = (process.env.ADMIN_EMAIL || "admin@agrofarm.local").toLowerCase().trim();
  const plainPassword = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Administrator";

  if (!email) {
    console.error("Admin seed: ADMIN_EMAIL is empty");
    return;
  }

  const hashed = await bcrypt.hash(plainPassword, 10);
  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.role === "admin") {
      if (force) {
        existing.password = hashed;
        existing.name = name;
        await existing.save();
        console.log("Admin: updated name/password for", email);
      } else {
        console.log(
          "Admin: already exists as admin (",
          email,
          ") — use --force to reset password"
        );
      }
      return;
    }
    if (force) {
      existing.password = hashed;
      existing.name = name;
      existing.role = "admin";
      await existing.save();
      console.log("Admin: promoted user to admin:", email);
      return;
    }
    console.log(
      "Admin: skip —",
      email,
      "is a non-admin user. Use --force to promote and reset password."
    );
    return;
  }

  await User.create({
    name,
    email,
    password: hashed,
    role: "admin",
    location: process.env.ADMIN_LOCATION || ""
  });
  console.log("Admin: created", email);
  if (!process.env.ADMIN_PASSWORD) {
    console.log(
      "         (default password: admin123 — set ADMIN_PASSWORD in .env and re-run with --force)"
    );
  }
}

async function runCli() {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    console.error("Set MONGO_URI or MONGODB_URI in backend/.env");
    process.exit(1);
  }
  const force = process.argv.includes("--force");
  await mongoose.connect(mongoUri);
  await seedAdmin({ force });
  await mongoose.disconnect();
  process.exit(0);
}

if (isMainModule()) {
  runCli().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
