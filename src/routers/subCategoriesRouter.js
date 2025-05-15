import express from "express";
import { authenticate, isadmin } from "../middlewares/authMiddleware.js";
import { createSubCategoriesValidator } from "../middlewares/joiValidation.js";

import {
  createSubCategories,
  getAdminSubCategories,
} from "../controllers/subCategoriesController.js";
const router = express.Router();

router.post(
  "/",
  authenticate,
  isadmin,
  createSubCategoriesValidator,
  createSubCategories
);
// Get subcategories by category  router.get('/subcategories/:categoryId',

router.get("/:categoryId", authenticate, isadmin, getAdminSubCategories);
// router.post("/", (req, res) => {
//   res.send({
//     message: "this is the categories api",
//   });
// });

export default router;
