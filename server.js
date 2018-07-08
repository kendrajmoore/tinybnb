//app

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
//mongoose
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";
//model
const House = require("./model/house.js");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const houseController = require("./controllers/houses.js");
app.use("/house", houseController);

//index
app.get("/house", (req, res) => {
  res.render("index.ejs");
});
//new
app.get("/house/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/house", (req, res) => {
  House.create(req.body, (error, house) => {
    res.redirect("/house");
  });
});

//show
app.get("/house/:id", (req, res) => {
  House.findById(req.params.id, (error, house) => {
    res.render("show.ejs", {
      house: house
    });
  });
});

//Edit
app.get("/house/:id/edit", (req, res) => {
  House.findById(req.params.id, (err, house) => {
    res.render("edit.ejs", {
      house: house
    });
  });
});

app.put("/house/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
    res.redirect("/house");
  });
});
//delete
app.delete("/house/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, (err, house) => {
    res.redirect("/house"); //redirect back to fruits index
  });
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
