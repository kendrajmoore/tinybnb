const express = require("express");
const router = express.Router();
const House = require("../models/house.js");

//index
router.get("/house", (req, res) => {
  res.render("index.ejs");
});
//new
router.get("/house/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/house", (req, res) => {
  House.create(req.body, (error, house) => {
    res.redirect("/house");
  });
});

//show
router.get("/house/:id", (req, res) => {
  House.findById(req.params.id, (error, house) => {
    res.render("show.ejs", {
      house: house
    });
  });
});

//Edit
router.get("/house/:id/edit", (req, res) => {
  House.findById(req.params.id, (err, house) => {
    res.render("edit.ejs", {
      house: house
    });
  });
});

router.put("/house/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
    res.redirect("/house");
  });
});
//delete
router.delete("/house/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, (err, house) => {
    res.redirect("/house"); //redirect back to fruits index
  });
});
