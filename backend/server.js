// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const colabRoutes = require("./routes/colaborativeEditingRoute");
const versionControlRoutes = require("./routes/versionControlRoute");
const sequelize = require("./config/db.js");
const { initKafka, sendEdit } = require("./kafkaConfig/kafka");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server);

initKafka(io).catch(console.error);

// *****************************************************************************************
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running.");
});
// *****************************************************************************************

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/colaborativeEditing", colabRoutes);
app.use("/api/versionControl", versionControlRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document: ${documentId}`);
  });

  socket.on("edit-document", async ({ documentId, userId, changes }) => {
    await sendEdit({ documentId, userId, changes });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.sync({ alter: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
});
