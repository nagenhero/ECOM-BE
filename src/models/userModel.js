import UserSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
