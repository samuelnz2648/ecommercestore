// ecommercestore/backend/routes/uploadRoutes.js

const express = require("express");
const router = express.Router();
const {
  uploadProductImage,
  getProductImage,
  deleteProductImage,
} = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Route to upload a product image
// POST /api/upload
router.post("/", protect, isAdmin, uploadMiddleware, uploadProductImage);

// Route to get a product image
// GET /api/upload/:filename
router.get("/:filename", getProductImage);

// Route to delete a product image
// DELETE /api/upload/:filename
router.delete("/:filename", protect, isAdmin, deleteProductImage);

module.exports = router;
