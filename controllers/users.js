const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//root route
router.get("/", (req, res) => {
  res.render("landing.ejs");
});

router.get("/new", (req, res) => {
  res.render("register.ejs");
});

router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/login");
  });
});

//show login form
router.get("/login", (req, res) => {
  res.render("login.ejs", { page: "login" });
});

//handling login logic
router.post("/login.ejs", (req, res) => {});

module.exports = router;
