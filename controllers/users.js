const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//root route
router.get("/", (req, res) => {
  res.render("landing.ejs");
});

// show register form
router.get("/register", (req, res) => {
  res.render("register.ejs", { page: "register" });
});

//handle sign up logic
router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  if (req.body.adminCode === process.env.ADMIN_CODE) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register.ejs", { error: err.message });
    }
    // passport.authenticate("local")(req, res, function() {
    //   req.flash(
    //     "success",
    //     "Successfully Signed Up! Nice to meet you " + req.body.username
    //   );
    res.redirect("/house");
  });
});

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
