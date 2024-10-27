const VersionControl = require("../models/versionControl"); // Import the VersionControl model
const Document = require("../models/Document"); // Import the Document model

// // Create a new document version
// exports.createVersion = async (req, res) => {
//     const { documentId, userId, title, content } = req.body;

//     try {
//         // Get the current version count for the document
//         const currentVersionCount = await VersionControl.count({
//             where: { documentId },
//         });

//         const newVersion = await VersionControl.create({
//             documentId,
//             userId,
//             version: currentVersionCount + 1, // Incrementing version number
//             title,
//             content,
//         });
//         res.status(201).json({ message: "New version created", version: newVersion });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating version", error: error.message });
//     }
// };

// Get document version history
exports.getVersionHistory = async (req, res) => {
    const { documentId } = req.params;

    try {
        const versions = await VersionControl.findAll({
            where: { documentId },
            order: [['createdAt', 'DESC']], // Order by most recent first
        });
        res.status(200).json(versions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching version history", error: error.message });
    }
};

// Revert to a previous document version
exports.revertVersion = async (req, res) => {
    const { documentId, versionId} = req.body;

    try {
        const versionToRevert = await VersionControl.findByPk(versionId);
        if (!versionToRevert) {
            return res.status(404).json({ message: "Version not found" });
        }

        // Update the document's content with the reverted version's content
        await Document.update(
            { content: versionToRevert.content },
            { where: { id: documentId } }
        );

        res.status(200).json({ message: "Document reverted to the selected version", version: versionToRevert });
    } catch (error) {
        res.status(500).json({ message: "Error reverting version", error: error.message });
    }
};
