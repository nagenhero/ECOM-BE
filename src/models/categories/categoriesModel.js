import CategoriesSchema from "./categoriesSchema.js";
//create categories
export const insertCategories = (catObj) => {
  return CategoriesSchema(catObj).save();
};

//get all categopries
export const getAllCategories = (filterdObj) => {
  return CategoriesSchema.find(filterdObj);
};
