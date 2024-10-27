const express = require("express");
const router = express.Router();
const documentController = require("../controllers/editDocController"); // Import your document controller
const authMiddleware = require("../middleware/authMiddleware");
// Route to edit a document
router.put("/edit/:documentId", authMiddleware, documentController.editDocument); // Assuming you want to use PUT for updates

module.exports = router;
