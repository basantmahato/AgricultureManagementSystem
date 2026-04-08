import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    readTimeMinutes: { type: Number, default: 5 }
  },
  { timestamps: true }
);

blogSchema.index({ publishedAt: -1 });
blogSchema.index({ category: 1 });

export default mongoose.model("Blog", blogSchema);
