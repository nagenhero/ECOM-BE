import express from "express";
import { authenticate, isadmin } from "../middlewares/authMiddleware.js";
import { createCategoriesValidator } from "../middlewares/joiValidation.js";
import { createCategories } from "../controllers/categoriesControllers.js";
const router = express.Router();

router.post(
  "/",
  authenticate,
  isadmin,
  createCategoriesValidator,
  createCategories
);
// router.post("/", (req, res) => {
//   res.send({
//     message: "this is the categories api",
//   });
// });
export default router;
