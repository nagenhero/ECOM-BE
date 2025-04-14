import CategoriesSchema from "./categoriesSchema.js";
//create categories
export const insertCategories = (catObj) => {
  return CategoriesSchema(catObj).save();
};
