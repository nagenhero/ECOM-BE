import { json } from "express";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/users/userModel.js";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { jwtSign, refreshJwtSign } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    console.log("requested body is", req.body);
    const { fName, lName, email, phone } = req.body;
    let { password } = req.body;
    password = await encryptText(password);
    //creating or regitering use ti database
    const data = await createNewUser({
      fName,
      lName,
      email,
      password,
      phone,
    });
    return res.status(201).json({
      status: "success",
      message: "user created",
      data,
    });
    console.log("encrypted password is", password);
  } catch (error) {
    console.log(error);
    next({
      statusCode: 400,
      message: error?.message, //If error is null or undefined, JavaScript does not try to access message and instead returns undefined
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email is:", email);
    console.log("passworrd is", password);

    //retrive user by email
    const userData = await getUserByEmail(email);
    if (!userData) {
      return (
        res.status(404),
        json({
          status: "error",
          message: "user not found in database",
        })
      );
    }
    //check hashed password of db and req body password
    const isPasswordValid = compareText(password, userData.password);
    if (isPasswordValid) {
      //create JWT
      const tokenData = { email: userData.email };
      const token = jwtSign(tokenData);
      const refreshToken = refreshJwtSign(tokenData);
      console.log("Refreshtoken is", refreshToken);
      // save the refresh Token in the userData
      const data = await updateUser(
        { email: userData.email },
        { refreshJWT: refreshToken }
      );
      // remove sensitve userData
      userData.refreshJWT = "";
      userData.password = "";
      return res.status(200).json({
        status: "success",
        message: "Login successfull",
        accessToken: token,
        refreshToken: refreshToken,
        user: userData,
      });
    } else {
      next({
        statusCode: 403,
        message: "Creditenals not matched",
      });
      // return res.status(403).json({
      //   status: "Error",
      //   message: "Credintails not matched",
      // });
    }

    // console.log("userData is", userData);
  } catch (error) {
    console.log("error is", error);
    next({
      statusCode: 500,
      message: "login error", //error?.message
    });
    // return res.status(500).json({
    //   status: "error",
    //   message: "login error.",
    // });
  }
};
