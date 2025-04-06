import UserSchema from "./userSchema.js";

//1.CREATING NEW USER
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

//2. RETRIVING USER BY EMAIL
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update user
export const updateUser = (filter, updatedUserObject) => {
  return UserSchema.findOneAndUpdate(filter, updatedUserObject);
};
