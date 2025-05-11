import { json } from "express";
import { v4 as uuidv4 } from "uuid";

import {
  createNewUser,
  getAllCustomers,
  getUserByEmail,
  updateUser,
} from "../models/users/userModel.js";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { jwtSign, refreshJwtSign } from "../utils/jwt.js";
import {
  deleteManySessions,
  insertToken,
} from "../models/sessions/sessionModel.js";
import { userActivationUrlEmail } from "../services/emailService.js";

export const register = async (req, res, next) => {
  try {
    console.log("requested body is", req.body);
    const { fName, lName, email, phone, thumbnail } = req.body;
    let { password } = req.body;
    password = await encryptText(password);
    //creating or regitering use ti database
    const data = await createNewUser({
      fName,
      lName,
      email,
      password,
      phone,
      thumbnail,
    });
    if (data?._id) {
      const sessions = await insertToken({
        token: uuidv4(),
        associate: data.email,
      });

      if (sessions?._id) {
        // Create activation URL using email (for demo/MVP purposes)
        const activationUrl =
          "http//:localhost:9004?sessionId=" +
          sessions._id +
          "&t=" +
          sessions.token;
        console.log("action url");

        // "

        // Send activation email
        // const transporter = emailTransporter();
        const mailOptions = userActivationUrlEmail({
          email,
          name: `${fName} ${lName}`,
          url: activationUrl,
        });
        // await transporter.sendMail(mailOptions);
        if (mailOptions) {
          return res.status(201).json({
            status: "success",
            message: "User created. Check your email to activate your account.",
            data,
          });
        } else {
          console.log("you got error in etheral man");
        }
      }
    }
    // return res.status(201).json({
    //   status: "success",
    //   message: "user created",
    //   data,
    // });
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
    const isPasswordValid = await compareText(password, userData.password);
    if (isPasswordValid) {
      //create JWT
      const tokenData = { email: userData.email };
      const { token, associate } = await jwtSign(tokenData);
      const refreshToken = await refreshJwtSign(tokenData);
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
        associate: associate,
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

//get user details
export const getUserDetails = async (req, res, next) => {
  req.userData.password = "";
  req.userData.refreshJWT = "";
  return res.json({
    status: "success",
    message: "successfully user  data is fetched",
    user: req.userData,
  });
};

export const getAdminAllCustomers = async (req, res, next) => {
  try {
    const customer = await getAllCustomers();
    console.log("all customers are:", customer);
    if (customer) {
      return res.json({
        status: "success",
        message: "All customers found and fetched successfully",
        customers: customer,
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

//renew jwt
export const renewJWT = async (req, res, next) => {
  // recreate the access Token

  const tokenData = {
    email: req.userData.email,
  };

  const { token, email } = await jwtSign(tokenData);
  console.log("token 1st", token);

  return res.status(200).json({
    status: "success",
    message: "Token Refreshed",
    accessToken: token,
    association: email,
  });
};

export const logoutUser = async (req, res, next) => {
  try {
    //get token
    const { email } = req.userData;
    //update refreshJWT TO "'"
    await updateUser({ email }, { refreshJWT: "" });

    //remove the accessJWT Ffrom session table
    await deleteManySessions({ associate: email });
  } catch (error) {}
};
