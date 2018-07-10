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
router.get("/new", (req, res) => {
  res.render("houses/new.ejs");
});

router.post("/", (req, res) => {
  House.create(req.body, (error, house) => {
    res.redirect("./houses/house.ejs");
  });
});

//show
router.get("/:id", (req, res) => {
  House.findById(req.params.id, (error, house) => {
    res.render("./houses/show.ejs");
  });
});

//Edit
router.get("/:id/edit", (req, res) => {
  House.findById(req.params.id, (err, house) => {
    res.render("./houses/edit.ejs");
  });
});

router.put("/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
    res.redirect("./houses/house");
  });
});
//delete
router.delete("/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, (err, house) => {
    res.redirect("./houses/house"); //redirect back to fruits index
  });
});

module.exports = router;
