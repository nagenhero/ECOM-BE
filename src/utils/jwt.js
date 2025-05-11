import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/sessionModel.js";
export const jwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  const email = signData.email;
  insertToken({ token: token, associate: email }); //passing as {token:}
  //insertToken({ token }); //same as {token:toke}
  return {
    token,
    email,
  };
};
export const refreshJwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRESIN,
  });
  return token;
};
//verify token
export const jwtVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//refresj jwt
export const refreshJwtVerify = async (token) => {
  return jwt.verify(token, process.env.REFRESH_JWT_SECRET);
};
