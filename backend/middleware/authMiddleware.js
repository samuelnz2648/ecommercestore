// ecommercestore/backend/middleware/authMiddleware.js

const User = require("../models/User");
const { verifyToken } = require("../utils/generateToken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = verifyToken(token);

      // Get user from the token
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
