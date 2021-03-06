//modules

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const House = require("../models/house.js");
const bcrypt = require("bcrypt");

//login page
router.get("/new", (req, res) => {
  res.render("login.ejs");
});

//Create a user

router.post("/", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, foundUser) => {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentuser = foundUser;
        res.redirect("/house");
      } else {
        res.send("wrong password");
      }
    }
  );
});

//delete/logout

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
