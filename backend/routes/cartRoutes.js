// ecommercestore/backend/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:itemId", protect, updateCartItem);
router.delete("/remove/:itemId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
