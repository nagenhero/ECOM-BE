import {
  getAllCategories,
  insertCategories,
} from "../models/categories/categoriesModel.js";

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

export const getAdminAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    console.log("all categories are are:", categories);
    if (categories) {
      return res.json({
        status: "success",
        message: "All categories  found and fetched successfully",
        products: categories,
      });
    } else {
      next({
        statusCode: 500,
        message: "Error ! No cateogies found",
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: `error getting all books--->${error.message}`,
    });
  }
};
