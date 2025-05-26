import multer from "multer";
import path from "path";

// define the storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/image");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
  },
});
// console.log("Saved filename:", req.file.filename);
// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject the file
  }
};

const limits = {
  fileSize: 1 * 1024 * 1024, //file limit to 1 MB
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
