import mongoose from "mongoose";
import Blog from "../models/Blog.js";

const listFields =
  "slug title excerpt category image publishedAt readTimeMinutes createdAt";

function dbReady() {
  return mongoose.connection.readyState === 1;
}

export const getBlogs = async (req, res) => {
  try {
    if (!dbReady()) {
      return res.status(503).json({
        message:
          "Database not connected. Check MONGO_URI or MONGODB_URI in .env and that MongoDB is reachable.",
      });
    }

    const wantsPagination =
      req.query.page !== undefined || req.query.pageSize !== undefined;

    if (wantsPagination) {
      const page = Math.max(1, parseInt(String(req.query.page), 10) || 1);
      const pageSize = Math.min(
        Math.max(parseInt(String(req.query.pageSize || "9"), 10) || 9, 1),
        50
      );
      const skip = (page - 1) * pageSize;
      const [posts, total] = await Promise.all([
        Blog.find()
          .sort({ publishedAt: -1 })
          .select(listFields)
          .skip(skip)
          .limit(pageSize)
          .lean(),
        Blog.countDocuments(),
      ]);
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      return res.json({
        posts,
        total,
        page,
        pageSize,
        totalPages,
      });
    }

    const raw = req.query.limit;
    const limit =
      raw === undefined || raw === ""
        ? 0
        : Math.min(Math.max(parseInt(String(raw), 10) || 0, 0), 50);

    const posts = await Blog.find()
      .sort({ publishedAt: -1 })
      .select(listFields)
      .limit(limit > 0 ? limit : 0)
      .lean();
    res.json(posts);
  } catch (err) {
    console.error("getBlogs:", err);
    res.status(500).json({
      message: "Server error",
      detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    if (!dbReady()) {
      return res.status(503).json({
        message:
          "Database not connected. Check MONGO_URI or MONGODB_URI in .env and that MongoDB is reachable.",
      });
    }

    const slug = req.params.slug?.toLowerCase().trim();
    if (!slug) return res.status(400).json({ message: "Slug required" });

    const post = await Blog.findOne({ slug }).lean();
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("getBlogBySlug:", err);
    res.status(500).json({
      message: "Server error",
      detail: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
};
