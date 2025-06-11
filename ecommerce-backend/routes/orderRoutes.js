const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const { setUserRole } = require("../middleware/setUserRole");

// Public (Customer)
router.post("/", setUserRole, createOrder);
router.get("/:id", setUserRole, getOrderById);

// Admin
router.get("/", setUserRole, getAllOrders);
router.put("/:id", setUserRole, updateOrderStatus);

module.exports = router;
