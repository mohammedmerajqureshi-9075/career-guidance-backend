import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType" // dynamic reference
    },
    targetType: {
      type: String,
      enum: ["Blog", "Career"], // which collection
      required: true
    }
  },
  { timestamps: true }
);

// Unique constraint → ek user ek hi blog/career ko sirf ek baar bookmark kar sake
bookmarkSchema.index({ user: 1, target: 1, targetType: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
