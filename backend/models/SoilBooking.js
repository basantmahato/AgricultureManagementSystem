import mongoose from "mongoose";

const soilBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    soilType: { type: String, required: true },
    cropDescription: { type: String },
    testingCenter: { type: String, required: true },
    location: { type: String, required: true },
    mobile: { type: String, required: true },
    soilTests: {
      pH: { type: Boolean, default: false },
      nitrogen: { type: Boolean, default: false },
      phosphorus: { type: Boolean, default: false },
      potassium: { type: Boolean, default: false }
    },
    soilPhotos: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },
    adminNotes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("SoilBooking", soilBookingSchema);
