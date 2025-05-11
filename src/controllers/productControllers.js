import {
  deleteProduct,
  getAllProducts,
  insertProducts,
  updateBook,
} from "../models/products/productsModel.js";
//create a  product
export const createProduct = async (req, res, next) => {
  try {
    const products = await insertProducts(req.body);
    products?._id //if proudct is not null or undfeined and _id exists// if null or undefined it throws error as nll or undeifned instead of crasshing app
      ? res.json({
          status: "success",
          message: "Products created successfully",
          productsDetails: products,
        })
      : next({
          statusCode: 500,
          message: "Books cannot be created or book_id is not found",
        });
  } catch (error) {
    next({
      statusCode: 500,
      message: `Error creating book --->${error.message}`,
    });
  }
};
//get all products by admin
export const getAdminAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    console.log("all priducts are:", products);
    if (products) {
      return res.json({
        status: "success",
        message: "All products found and fetched successfully",
        products: products,
      });
    } else {
      next({
        statusCode: 500,
        message: "Error ! No products found",
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: `error getting all books--->${error.message}`,
    });
  }
};

//get pub-product
export const getPubProduct = async (req, res, next) => {
  try {
    const products = await getAllProducts({ status: "active" });
    if (products) {
      res.json({
        status: "success",
        message: "Products fetched for public products",
        products: products,
      });
    } else {
      next({
        statusCode: 500,
        message: "Error ! No products public found",
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: `Error getting pubProduct-->${error.message}`,
    });
  }
};
//delete product
export const deleteProductById = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const booksDeleted = await deleteProduct(_id);
    if (booksDeleted?._id) {
      return res.json({
        status: "success",
        message: "The product is deleted successfully",
        booksDeleted: booksDeleted,
      });
    } else {
      next({
        statusCode: 500,
        message:
          "Error deleting either might be null,undefined or no deleteted product found for given id",
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: `Error in delteting-->${error.message}`,
    });
  }
};
//update product
export const updateProductController = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const product = await updateBook(_id, req.body);
    product?._id
      ? res.json({
          status: "success",
          message: " products has been updated succesfully",
          updatedProduct: product,
        })
      : next({
          status: 400,
          message: "product cannot be updated!",
        });
  } catch (error) {
    next({
      statusCode: 500,
      message: `Error in updating products -->${error.message}`,
    });
  }
};
