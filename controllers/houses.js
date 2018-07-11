const express = require("express");
const router = express.Router();
const House = require("../models/house.js");

//index;
router.get("/", (req, res) => {
  House.find({}, (err, house) => {
    res.render("houses/index.ejs", {
      house: house
    });
  });
});
//new
router.get("/new", (req, res) => {
  res.render("houses/new.ejs");
});

router.post("/", (req, res) => {
  House.create(req.body, (error, house) => {
    res.render("houses/show.ejs", {
      house: house
    });
  });
});

//show
router.get("/:id", (req, res) => {
  House.findById(req.params.id, (error, house) => {
    res.render("houses/show.ejs", {
      house: house
    });
  });
});

//Edit
router.get("/:id/edit", (req, res) => {
  House.findById(req.params.id, (err, house) => {
    res.render("houses/edit.ejs", {
      house: house
    });
  });
});

router.put("/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
    res.redirect("houses/house.ejs");
  });
});
//delete
router.delete("/house/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, (err, house) => {
    res.redirect("/house");
  });
});

module.exports = router;
