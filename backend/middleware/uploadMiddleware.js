// ecommercestore/backend/middleware/uploadMiddleware.js

const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Validate file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Error: File upload only supports the following filetypes - " + filetypes
    )
  );
};

// Configure upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

// Middleware function to handle file upload
const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({
            message: "File size limit exceeded. Maximum file size is 5MB.",
          });
      }
      return res
        .status(400)
        .json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ message: `Upload error: ${err.message}` });
    }
    // Everything went fine.
    next();
  });
};

module.exports = uploadMiddleware;
