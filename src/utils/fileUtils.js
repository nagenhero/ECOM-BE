import { unlink } from "fs";
import { resolve } from "path";

// Delete files
const deleteFile = (filePath) => {
  console.log("DELETING", filePath);
  unlink(resolve("assets/" + filePath), (err) => {
    if (err) {
      console.error(`Failed to delete ${filePath}:`, err);
    } else {
      console.log(`${filePath} has been deleted`);
    }
  });
};
export default deleteFile;
