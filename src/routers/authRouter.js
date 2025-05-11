import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import {
  getAdminAllCustomers,
  getUserDetails,
  login,
  logoutUser,
  register,
  renewJWT,
} from "../controllers/authController.js";
import {
  authenticate,
  isadmin,
  refreshAuthenticate,
} from "../middlewares/authMiddleware.js";
const router = express.Router(); //for routing
//register api
router.get("/register", (req, res) => {
  res.send({
    message: "this is the register api",
  });
});

//1.to register user
router.post("/register", registerValidator, register);

//2.login user
router.post("/login", loginValidator, login);
// router.post("/login", (req, res) => {
//   res.send({
//     message: "this is the  loginapi",
//   });
// });

//3.get logged in user data
router.get("/", authenticate, getUserDetails);

router.get("/all-customers", authenticate, isadmin, getAdminAllCustomers);

// 4.renew jwt
router.get("/renew-jwt", refreshAuthenticate, renewJWT);
router.get("/logout", authenticate, logoutUser);
export default router;
