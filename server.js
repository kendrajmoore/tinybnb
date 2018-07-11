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

const house = require("./models/house.js");
const user = require("./models/user.js");

const userController = require("./controllers/users.js");
app.use("/user", userController);

const houseController = require("./controllers/houses.js");
app.use("/house", houseController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";
const db = mongoose.connection;
//

app.get("/", (req, res) => {
  res.render("landing.ejs");
});

app.get("*", (req, res) => {
  res.render("error/index.ejs");
});
//
// app.get("/", (req, res) => {
//   res.render("index.ejs", {
//     currentUser: req.session.currentUser
//   });
// });

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
