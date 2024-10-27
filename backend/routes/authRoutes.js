// routes/authRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { signup, signin } = require("../controllers/authController"); // Adjust the path according to your project structure

// Signup route
router.post("/signup", signup);

// Signin route
router.post("/signin", signin);

router.get("/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome ${req.username}! You are authenticated.` });
});

module.exports = router;
