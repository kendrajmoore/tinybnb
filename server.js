const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";

app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(PORT, () => {
  console.log("listening.....");
});

mongoose.connect(mongoUri);
mongoose.connection.on("open", () => {
  console.log("connected to mongoose");
});
