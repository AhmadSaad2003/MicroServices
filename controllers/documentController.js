const jwt = require("jsonwebtoken");
const Document = require("../models/Document");

exports.createDocument = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const username = decoded.username;
    const { content, title } = req.body;
    if (!content || !title) {
      return res
        .status(400)
        .json({ message: "Content and title are required" });
    }

    const newDocument = await Document.create({
      userId,
      createdBy: username,
      title,
      content,
      creationDate: new Date(),
    });
    res.status(201).json({
      message: "Document created successfully",
      document: newDocument,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDocumentsWithTitlesAndAuthors = async (req, res) => {
  try {
    const documents = await Document.findAll({
      attributes: ["title", "createdBy"],
    });

    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletDocumentById = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findOne({
      where: { id: documentId },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    await Document.destroy({
      where: { id: documentId },
    });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
