// ecommercestore/backend/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.get("/user/:userId", protect, getUserOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
