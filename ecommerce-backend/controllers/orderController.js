const { Order, OrderItem, Product } = require("../models");
const { sequelize } = require("../models");

// ✅ GET all orders (admin only)
exports.getAllOrders = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }

  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items",
          include: {
            model: Product,
            attributes: ["name", "price", "discountedPrice", "image"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error("getAllOrders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ✅ GET single order by ID (open to anyone)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

// ✅ POST: Create order (open to all)
exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, email, address, phone, cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart cannot be empty" });
    }

    let totalAmount = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Product ID ${item.productId} not found` });
      }
      totalAmount += (product.discountedPrice || product.price) * item.quantity;
    }

    const order = await Order.create(
      {
        name,
        email,
        address,
        phone,
        totalAmount,
        userId: req.user?.id || null,
      },
      { transaction: t }
    );

    for (const item of cartItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: order.id });
  } catch (err) {
    await t.rollback();
    console.error("createOrder Error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// ✅ PUT update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }

  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};
