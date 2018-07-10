const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//root route
router.get("/", (req, res) => {
  res.render("landing.ejs");
});

router.get("/register", (req, res) => {
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
//handle sign up logic
// router.post("/register", (req, res) => {
//   const newUser = new User({ username: req.body.username });
//   if (req.body.adminCode === process.env.ADMIN_CODE) {
//     newUser.isAdmin = true;
//   }
//   User.register(newUser, req.body.password, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.render("register.ejs", { error: err.message });
//     }
//
//     res.redirect("/house");
//   });
// });

//show login form
router.get("/login", (req, res) => {
  res.render("login.ejs", { page: "login" });
});

//handling login logic
router.post("/login.ejs", (req, res) => {});

// logout route
router.get("/logout.ejs", (req, res) => {
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/house");
});

module.exports = router;
