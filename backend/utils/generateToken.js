// ecommercestore/backend/utils/generateToken.js
const jwt = require("jsonwebtoken");
const config = require("../config/dotenv");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

module.exports = generateToken;
