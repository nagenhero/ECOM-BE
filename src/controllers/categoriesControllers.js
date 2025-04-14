import { insertCategories } from "../models/categories/categoriesModel.js";

export const createCategories = async (req, res, next) => {
  try {
    const categories = await insertCategories(req.body);
    if (categories) {
      res.json({
        status: "success",
        message: " categories has been sucessfully created",
        categoriesName: categories,
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "Error creating categories",
    });
  }
};
