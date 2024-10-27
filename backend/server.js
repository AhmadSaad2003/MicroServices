// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Import Socket.IO
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const colabRoutes = require("./routes/colaborativeEditingRoute");
const versionControlRoutes = require("./routes/versionControlRoute");
const sequelize = require("./config/db.js");
const { initKafka, sendEdit } = require("./kafkaConfig/kafka"); // Import initKafka and sendEdit

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server);

// Start Kafka
initKafka(io).catch(console.error); // Pass io to initKafka

// *****************************************************************************************
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running.");
});
// *****************************************************************************************

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/colaborativeEditing", colabRoutes);
app.use("/api/versionControl", versionControlRoutes);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a document room
  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document: ${documentId}`);
  });

  // Handle document edits
  socket.on("edit-document", async ({ documentId, userId, changes }) => {
    // Send the edit update to Kafka
    await sendEdit({ documentId, userId, changes }); // Use sendEdit to send to Kafka
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    // Sync Sequelize models with the database
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
});
