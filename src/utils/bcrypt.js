import bcrypt from "bcryptjs";
const SALT_ROUND = 10;

export const encryptText = (inputText) => {
  return bcrypt.hash(inputText, SALT_ROUND);
};
export const compareText = (plainText, encryptedText) => {
  return bcrypt.compare(plainText, encryptedText);
};
