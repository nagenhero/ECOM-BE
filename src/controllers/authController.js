import { createNewUser } from "../models/userModel.js";
import { encryptText } from "../utils/bcrypt.js";

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

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email is:", email);
    console.log("passworrd is", password);

    //retrive user by email
    const userData = getUserByEmail(email);
    console.log("userData is", userData);
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
