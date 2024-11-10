const jwt = require("jsonwebtoken");
const Document = require("../models/Document");
const VersionControl = require("../models/versionControl");

exports.editDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const document = await Document.findOne({
      where: { id: documentId },
    });

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found or not authorized" });
    }

    document.content = content;
    document.creationDate = new Date();
    await document.save();

    const versionCount = await VersionControl.count({
      where: { documentId: document.id },
    });
    const newVersion = versionCount + 1;

    const versionControl = await VersionControl.create({
      version: newVersion,
      title: document.title,
      documentId: document.id,
      userId: userId,
      content,
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
