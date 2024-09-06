// ecommercestore/backend/controllers/uploadController.js

const path = require("path");
const fs = require("fs");

// @desc    Upload product image
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
};

// @desc    Get product image
// @route   GET /api/upload/:filename
// @access  Public
exports.getProductImage = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../../uploads", filename);

  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(filepath);
  });
};

// @desc    Delete product image
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
exports.deleteProductImage = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../../uploads", filename);

  fs.unlink(filepath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).json({ message: "File not found" });
      }
      return res.status(500).json({ message: "Error deleting file" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  });
};
