// ecommercestore/backend/models/index.js

const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// User associations
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Product, { foreignKey: "adminId" });
Product.belongsTo(User, { as: "Admin", foreignKey: "adminId" });

// Cart associations
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

// Product associations
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// Order associations
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

module.exports = {
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
