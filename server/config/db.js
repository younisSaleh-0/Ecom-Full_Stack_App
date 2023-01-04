const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Replace YOUR_MONGODB_URI with your actual MongoDB connection string
mongoose.connect(process.env.MONGODB_URI || 5000, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = db
