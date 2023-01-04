const express = require("express");
const User = require("../models/userModel.js");
const { registerUser, loginUser } = require("../controllers/userController.js");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
