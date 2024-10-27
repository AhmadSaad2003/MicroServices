const express = require("express");
const { sendEdit } = require("./kafka");
const router = express.Router();

// Edit Document Route
router.post("/edit", async (req, res) => {
    const { documentId, content, userId } = req.body;

    // Send the edit to Kafka
    await sendEdit({ documentId, content, userId });

    // Respond with success
    res.status(200).json({ message: "Edit sent", documentId, content });
});

module.exports = router;
