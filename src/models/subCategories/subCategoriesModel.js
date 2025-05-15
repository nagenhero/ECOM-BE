import Subcategory from "./subCategoriesSchema.js"; // This is the model, not just the schema

// Create and save a new subcategory
export const insertSubcategory = (subcatObj) => {
  return new Subcategory(subcatObj).save();
};

//get all categopries
export const getSubCategory = (filterdObjId) => {
  return Subcategory.find({ category: filterdObjId });
};
