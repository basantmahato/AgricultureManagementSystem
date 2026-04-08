import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

export function getMongoUri() {
  return process.env.MONGO_URI || process.env.MONGODB_URI;
}
