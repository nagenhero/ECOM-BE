import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import { register } from "../controllers/authController.js";

const router = express.Router(); //for routing
//register api
router.get("/register", (req, res) => {
  res.send({
    message: "this is the register api",
  });
});

//to register user
router.post("/register", registerValidator, register);
export default router;

//login user
router.post("/login", loginValidator), login;
