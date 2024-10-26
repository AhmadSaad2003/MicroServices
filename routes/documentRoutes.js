const express = require("express");
const router = express.Router();
const { createDocument } = require("../controllers/documentController");
const { editDocument } = require("../controllers/editDocController");
const {
  getAllDocumentsWithTitlesAndAuthors,
} = require("../controllers/documentController");
const { deletDocumentById } = require("../controllers/documentController");

router.post("/create", createDocument);

router.put("/edit/:documentId", editDocument);

router.get("/getDocuments", getAllDocumentsWithTitlesAndAuthors);

router.post("/delete/:documentId", deletDocumentById);

module.exports = router;
