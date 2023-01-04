const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;

    // Validate request body
    if (!firstName || !lastName || !email || !password || !mobile) {
      return res
        .status(400)
        .send({ error: "Please provide all required fields" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email, mobile });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate a JWT and send a response
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Please provide email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
