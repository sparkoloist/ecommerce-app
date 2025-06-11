const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 2. Import middleware and routes
const { setUserRole } = require("./middleware/setUserRole");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// 3. Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// 4. Apply middlewares
app.use(bodyParser.json());
app.use(setUserRole);

// 5. Mount routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// 6. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
