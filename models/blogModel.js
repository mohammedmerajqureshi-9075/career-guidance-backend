import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    coverImage: {
      type: String,
      default: "https://via.placeholder.com/600x400",
    },
    author: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      default: "5 min",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // createdAt & updatedAt auto add ho jaayega
);

const Blog= mongoose.model("Blog", blogSchema);
export default Blog;

// export default mongoose.model("Blog", blogSchema);
