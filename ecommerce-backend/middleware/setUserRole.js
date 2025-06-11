const setUserRole = (req, res, next) => {
  req.user = {
    id: 1,
    name: "Admin User",
    role: "admin",
  };
  next();
};

module.exports = { setUserRole };
