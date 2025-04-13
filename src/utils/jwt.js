import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/sessionModel.js";
export const jwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  insertToken({ tokens: token }); //passing as {token:}
  //insertToken({ token }); //same as {token:toke}
  return token;
};
export const refreshJwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRESIN,
  });
  return token;
};
//verify token
export const jwtVerify = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT cannot be verified", error.message);
  }
};
