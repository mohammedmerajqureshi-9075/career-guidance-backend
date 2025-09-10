import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // kisne bookmark kiya
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // konsa blog bookmark hua
      required: true,
    },
  },
  { timestamps: true }
);

// ek user ek hi blog ko ek hi baar bookmark kar sake
bookmarkSchema.index({ user: 1, blog: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
