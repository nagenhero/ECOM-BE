import express from "express";
import { authenticate, isadmin } from "../middlewares/authMiddleware.js";
import { createCategoriesValidator } from "../middlewares/joiValidation.js";
import {
  createCategories,
  getAdminAllCategories,
} from "../controllers/categoriesControllers.js";
const router = express.Router();

router.post(
  "/",
  authenticate,
  isadmin,
  createCategoriesValidator,
  createCategories
);

router.get("/", authenticate, isadmin, getAdminAllCategories);

// router.post("/", (req, res) => {
//   res.send({
//     message: "this is the categories api",
//   });
// });
export default router;
