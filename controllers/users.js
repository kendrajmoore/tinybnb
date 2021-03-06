const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
//get sign up form
router.get("/new", (req, res) => {
  res.render("register.ejs");
});
//post sign up form
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    console.log(createdUser);
    res.redirect("/house");
  });
});

module.exports = router;
