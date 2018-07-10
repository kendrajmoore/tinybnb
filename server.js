//app

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const env = require("dotenv").config();
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const morgan = require("morgan");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);

// static files middleware
app.use(express.static("public"));

const House = require("./models/house.js");
const User = require("./models/user.js");
const seed = require("./models/seed.js");

const userController = require("./controllers/users.js");
app.use("/user", userController);

const houseController = require("./controllers/houses.js");
app.use("/house", houseController);

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";
const db = mongoose.connection;
//
//seed route
app.get("/seedHouse", (req, res) => {
  House.create(seed, (err, createdHouses) => {
    console.log(createdHouses);

    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  res.render("landing.ejs");
});

//port
app.listen(PORT, () => {
  console.log("listening.....");
});
//connect database
mongoose.connect(mongoUri);

mongoose.Promise = global.Promise;
mongoose.connection.on("open", () => {
  console.log("connected to mongoose");
});
