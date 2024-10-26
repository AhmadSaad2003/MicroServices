const jwt = require("jsonwebtoken");
const Document = require("../models/Document");

exports.editDocument = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const username = decoded.username;

    const { documentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const document = await Document.findOne({
      where: { id: documentId, userId },
    });

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found or not authorized" });
    }

    document.content = content;
    document.creationDate = new Date();
    await document.save();

    res
      .status(200)
      .json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
