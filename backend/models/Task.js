import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,

    taskType: {
      type: String,
      enum: ["Irrigation", "Fertilizer", "Harvest", "Pesticide", "Other"],
      default: "Other"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    cropName: {
      type: String
    },

    fieldLocation: {
      type: String
    },

    estimatedCost: {
      type: Number
    },

    actualCost: {
      type: Number
    },

    dueDate: Date,

    notes: String,

    weatherSensitive: {
      type: Boolean,
      default: false
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
