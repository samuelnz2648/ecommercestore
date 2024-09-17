// ecommercestore/backend/config/db.js

const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
const config = require("./dotenv");

// Parse the DATABASE_URL
const { host, username, password, database } = parseConnectionString(
  config.DATABASE_URL
);

// Function to create database if it doesn't exist
async function createDatabaseIfNotExists() {
  try {
    // Create a connection without specifying a database
    const connection = await mysql.createConnection({
      host,
      user: username,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
    await connection.end();
    console.log("Database checked/created successfully");
  } catch (error) {
    console.error("Unable to create database:", error);
    throw error;
  }
}

// Create Sequelize instance
const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: "mysql",
  logging: config.NODE_ENV === "development" ? console.log : false,
});

// Function to initialize database connection
async function initializeDatabase() {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

// Helper function to parse connection string
function parseConnectionString(connectionString) {
  const match = connectionString.match(
    /mysql:\/\/(\w+):(.+)@([\w.]+):(\d+)\/(\w+)/
  );
  if (!match) throw new Error("Invalid connection string format");
  const [, username, password, host, port, database] = match;
  return { host, username, password, port, database };
}

module.exports = { sequelize, initializeDatabase };
