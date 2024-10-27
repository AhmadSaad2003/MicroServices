const express = require("express");
const router = express.Router();
const versionControlController = require("../controllers/versionController"); // Import the controller
const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware

// Create a new document version
router.post("/create", authMiddleware, versionControlController.createVersion); // Add middleware here

// Get document version history
router.get("/history/:documentId", authMiddleware, versionControlController.getVersionHistory); // Add middleware here

// Revert to a previous document version
router.post("/revert", authMiddleware, versionControlController.revertVersion); // Add middleware here

module.exports = router;
