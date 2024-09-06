// ecommercestore/backend/config/db.js

const { Sequelize } = require("sequelize");
const config = require("./dotenv");

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: "mysql",
  logging: config.NODE_ENV === "development" ? console.log : false,
});

module.exports = sequelize;
