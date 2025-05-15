import {
  getSubCategory,
  insertSubcategory,
} from "../models/subCategories/subCategoriesModel.js";

export const createSubCategories = async (req, res, next) => {
  try {
    const subCategories = await insertSubcategory(req.body);
    if (subCategories) {
      res.json({
        status: "success",
        message: " subcategories has been sucessfully created",
        categoriesName: subCategories,
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "Error creating Subcategories",
    });
  }
};

//get subcategorie of category ie tops&tshitrts,bottoms, shoes of mens category

export const getAdminSubCategories = async (req, res, next) => {
  try {
    const paramId = req.params.categoryId;
    console.log("seconf", req.params.categoryId.name);

    const subCategories = await getSubCategory(paramId);
    if (subCategories) {
      res.json({
        status: "success",
        message: `subcategories has been succesfull fetched for ${paramId} `,
        subCategories: subCategories,
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "Error fetching Subcategories",
    });
  }
};
