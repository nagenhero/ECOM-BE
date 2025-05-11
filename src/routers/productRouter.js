import express, { Router } from "express";
import { authenticate, isadmin } from "../middlewares/authMiddleware.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../middlewares/joiValidation.js";
import {
  createProduct,
  deleteProductById,
  getAdminAllProducts,
  getPubProduct,
  updateProductController,
} from "../controllers/productControllers.js";
const productRouter = express.Router();
// productRouter.post("/", (req, res) => {
//   res.send("this is product api");
// });

//Creating products
productRouter.post(
  "/",
  authenticate,
  isadmin,
  createProductValidator,
  createProduct
);

//get all products
productRouter.get("/", authenticate, isadmin, getAdminAllProducts);
export default productRouter;

//get pub-product whose  status is only active
productRouter.get("/pub-product", getPubProduct);

//delete product by id
productRouter.delete("/:_id", authenticate, isadmin, deleteProductById);

//put product by id
productRouter.put(
  "/:_id",
  authenticate,
  isadmin,
  updateProductValidator,
  updateProductController
);
// productRouter.put("/:_id", (req, res) => {
//   res.send("this is put api");
// });
