import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import {
  getUserDetails,
  login,
  register,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router(); //for routing
//register api
router.get("/register", (req, res) => {
  res.send({
    message: "this is the register api",
  });
});

//1.to register user
router.post("/register", registerValidator, register);
export default router;

//2.login user
router.post("/login", loginValidator, login);

//3.get logged in user data
router.get("/", authenticate, getUserDetails);
