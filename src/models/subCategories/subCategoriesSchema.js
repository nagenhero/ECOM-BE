import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
});

const Subcategory = mongoose.model("subCategory", subcategorySchema);
export default Subcategory;
