// import { required } from "joi";
import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
// // Create the unique index manually to be certain
// categoriesSchema.index({ name: 1 }, { unique: true });
export default mongoose.model("Categories", categoriesSchema);
