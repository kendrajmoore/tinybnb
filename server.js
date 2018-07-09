//app

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const House = require("./models/house.js");

//middleware
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// const houseController = require("./controllers/houses.js");
// app.use("/house", houseController);

const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinybnb";

//seed route
app.get("/house/seed", (req, res) => {
  House.create(
    [
      {
        type: "boat",
        image:
          "https://www.pexels.com/photo/beautiful-boat-daylight-foggy-273886/",
        price: 10,
        size: 10,
        location: "San Francisco"
      },
      {
        type: "apartment",
        image:
          "https://www.pexels.com/photo/beautiful-boat-daylight-foggy-273886/",
        price: 1000,
        size: 500,
        location: "SOMA"
      },
      {
        type: "Boat-House",
        image:
          "https://www.pexels.com/photo/beautiful-boat-daylight-foggy-273886/",
        price: 5000,
        size: 1000,
        location: "Alameda"
      }
    ],
    (err, house) => {
      res.redirect("/house");
    }
  );
});

app.get("/house", (req, res) => {
  res.render("index.ejs", {
    House: House
  });
});

console.log(House);
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
  house.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
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
