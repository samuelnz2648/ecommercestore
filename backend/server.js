// ecommercestore/backend/server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { sequelize, initializeDatabase } = require("./config/db");
const models = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database (this will create the database if it doesn't exist)
    await initializeDatabase();

    // Sync all models
    await sequelize.sync({ force: false });
    console.log("Database & tables created!");

    // Routes
    app.use("/api/users", require("./routes/userRoutes"));
    app.use("/api/products", require("./routes/productRoutes"));
    app.use("/api/cart", require("./routes/cartRoutes"));
    app.use("/api/orders", require("./routes/orderRoutes"));
    app.use("/api/upload", require("./routes/uploadRoutes"));

    // Error Handling Middleware
    app.use(errorHandler);

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
