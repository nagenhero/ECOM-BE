import mongoose from "mongoose";
const productsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String], // Array of strings
      enum: ["S", "M", "L", "XL"], // Optional: limit allowed values
      default: [],
    },

    imageLists: {
      type: [String], // Array of strings

      default: [],
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("product", productsSchema);
