const express = require("express");
const router = express.Router();
const House = require("../models/house.js");

//seed route
router.get("/house/seed", (req, res) => {
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

//index;
router.get("/house", (req, res) => {
  res.render("index.ejs");
});
new router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  House.create(req.body, (error, house) => {
    res.redirect("/house");
  });
});

//show
router.get("/:id", (req, res) => {
  House.findById(req.params.id, (error, house) => {
    res.render("show.ejs", {
      house: house
    });
  });
});

//Edit
router.get("/:id/edit", (req, res) => {
  House.findById(req.params.id, (err, house) => {
    res.render("edit.ejs", {
      house: house
    });
  });
});

router.put("/:id", (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body, (err, house) => {
    res.redirect("/house");
  });
});
//delete
router.delete("/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, (err, house) => {
    res.redirect("/house"); //redirect back to fruits index
  });
});

module.exports = router;
