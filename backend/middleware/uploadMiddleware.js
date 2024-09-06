// ecommercestore/backend/middleware/uploadMiddleware.js

const multer = require("multer");
const uploadConfig = require("../config/multer");

// Middleware function to handle file upload
const uploadMiddleware = (req, res, next) => {
  uploadConfig.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res
        .status(400)
        .json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res
        .status(500)
        .json({ message: `Unknown upload error: ${err.message}` });
    }
    // Everything went fine.
    next();
  });
};

module.exports = uploadMiddleware;
