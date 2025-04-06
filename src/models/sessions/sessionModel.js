import Session_Schema from "./sessionSchema.js";

//insert token into session database

export const insertToken = ({ tokens }) => {
  return Session_Schema({ token: tokens }).save();
};
// you can use both below 2 method
// export const insertToken = ({ token }) => {
//   return Session_Schema({ token }).save();
// };

// export const insertToken = (Obj) => {
//   return Session_Schema(Obj).save();
// };
