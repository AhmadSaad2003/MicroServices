const Document = require("../models/Document");
const VersionControl = require("../models/versionControl");

exports.createDocument = async (req, res) => {
  try {
    const { content, title } = req.body;
    if (!content || !title) {
      return res
        .status(400)
        .json({ message: "Content and title are required" });
    }
    const document = await Document.create({
      userId: req.userId,
      title,
      content,
      creationDate: new Date(),
    });

    const versionControl = await VersionControl.create({
      version: 1,
      title: document.title,
      documentId: document.id,
      userId: req.userId,
      content,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Version entry created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
