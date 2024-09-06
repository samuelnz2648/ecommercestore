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

router.post("/", protect, isAdmin, uploadMiddleware, uploadProductImage);
router.get("/:filename", getProductImage);
router.delete("/:filename", protect, isAdmin, deleteProductImage);

module.exports = router;
