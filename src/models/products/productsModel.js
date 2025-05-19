import ProductSchema from "./productsSchema.js";
//create product

export const insertProducts = (prodObj) => {
  return ProductSchema(prodObj).save();
};

//get all products
export const getAllProducts = (filterdObj) => {
  return ProductSchema.find(filterdObj);
};

//delete products
export const deleteProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};
//update products
export const updateProduct = (_id, prodObj) => {
  return ProductSchema.findByIdAndUpdate(_id, prodObj);
};
