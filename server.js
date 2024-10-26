// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Adjust the path according to your project structure
const documentRoutes = require("./routes/documentRoutes"); // Adjust the path according to your project structure
const sequelize = require("./config/db.js"); // Adjust the path according to your project structure

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// *****************************************************************************************
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running.");
});
// *****************************************************************************************

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    // Sync Sequelize models with the database
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
});
