const express = require("express");
const router = express.Router();
const {
  createDocument,
  getDocumentById,
} = require("../controllers/documentController");
const { editDocument } = require("../controllers/editDocController");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllDocumentsWithTitlesAndAuthors,
} = require("../controllers/documentController");
const { deletDocumentById } = require("../controllers/documentController");

router.post("/create", authMiddleware, createDocument);

router.get(
  "/getDocuments",
  authMiddleware,
  getAllDocumentsWithTitlesAndAuthors
);

router.get("/getDocById/:documentId", authMiddleware, getDocumentById);

router.post("/delete/:documentId", authMiddleware, deletDocumentById);

module.exports = router;
