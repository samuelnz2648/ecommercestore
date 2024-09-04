// ecommercestore/backend/models/index.js
const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// User associations
User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Product, { foreignKey: "adminId" });
Product.belongsTo(User, { as: "Admin", foreignKey: "adminId" });

// Cart associations
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

// Product associations
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Order associations
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = {
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
