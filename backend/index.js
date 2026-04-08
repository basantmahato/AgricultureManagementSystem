import { getMongoUri } from "./loadEnv.js";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
const mongoUri = getMongoUri();

if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("DB Connection Error:", err.message);
      console.error(
        "API will still start; database routes may fail until MongoDB is reachable."
      );
    });
} else {
  console.error(
    "DB Connection Error: Missing MONGO_URI or MONGODB_URI in backend/.env"
  );
  console.error(
    "API will still start; database routes may fail after you set the URI."
  );
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
