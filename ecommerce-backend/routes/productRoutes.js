const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { setUserRole } = require("../middleware/setUserRole");

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", setUserRole, addProduct);
router.put("/:id", setUserRole, updateProduct);
router.delete("/:id", setUserRole, deleteProduct);

module.exports = router;
