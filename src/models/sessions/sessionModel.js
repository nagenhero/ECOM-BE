import Session_Schema from "./sessionSchema.js";

//insert token into session database

export const insertToken = ({ token, associate }) => {
  console.log("ss", token, associate);

  return Session_Schema({ token, associate }).save();
};
export const findToken = (token) => {
  return Session_Schema.findOne({ token: token });
};
export const deleteManySessions = (token) => {
  return Session_Schema.deleteMany(token);
};
// you can use both below 2 method
// export const insertToken = ({ token }) => {
//   return Session_Schema({ token }).save();
// };

// export const insertToken = (Obj) => {
//   return Session_Schema(Obj).save();
// };
