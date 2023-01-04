const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoute.js");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", authRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!!");
// });

app.get("*", (req, res) => {
  res.send("Page not found");
});

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
