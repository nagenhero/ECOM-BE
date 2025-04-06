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
