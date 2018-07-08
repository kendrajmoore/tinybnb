//app

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const House = require("./model/house.js");
//mongoose
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";
//model

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const houseController = require("./controllers/houses.js");
app.use("/house", houseController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//port
app.listen(PORT, () => {
  console.log("listening.....");
});
//connect database
mongoose.connect(mongoUri);
mongoose.connection.on("open", () => {
  console.log("connected to mongoose");
});
