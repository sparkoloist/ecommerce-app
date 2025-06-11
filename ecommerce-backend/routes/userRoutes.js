const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Middleware to mock user role - reuse setUserRole if you want
const { setUserRole } = require("../middleware/setUserRole");

// GET all users — only admin can access
router.get("/", setUserRole, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET current user info (mocked as user with id=1)
router.get("/me", setUserRole, async (req, res) => {
  try {
    // Since user is mocked, just returned that user info
    const user = await User.findByPk(1, {
      attributes: ["id", "name", "email", "role", "createdAt"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
