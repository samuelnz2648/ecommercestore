// ecommercestore/backend/config/jwt.js

const jwt = require("jsonwebtoken");
const config = require("./dotenv");

const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
