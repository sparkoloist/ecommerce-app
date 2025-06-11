const { Product, Category } = require("../models");

// GET all products with category
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    });
    res.json(products);
  } catch (err) {
    console.error("getAllProducts Error:", err); // 🔍
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET single product by ID with category
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    });

    if (product) res.json(product);
    else res.status(404).json({ error: "Product not found" });
  } catch (err) {
    console.error("getProductById Error:", err); // 🔍
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ADMIN: Add product
const addProduct = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });

  try {
    const { name, price, discountedPrice, image, categoryId } = req.body;

    // Validate categoryId
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(400).json({ error: "Invalid categoryId" });

    const product = await Product.create({
      name,
      price,
      discountedPrice,
      image,
      categoryId,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("addProduct Error:", err); // 🔍
    res.status(500).json({ error: "Failed to add product" });
  }
};

// ADMIN: Update product
const updateProduct = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });

  try {
    const id = req.params.id;
    const { name, price, discountedPrice, image, categoryId } = req.body;

    // Validate categoryId if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category)
        return res.status(400).json({ error: "Invalid categoryId" });
    }

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update({ name, price, discountedPrice, image, categoryId });

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error("updateProduct Error:", err); // 🔍
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ADMIN: Delete product
const deleteProduct = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct Error:", err); // 🔍
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
