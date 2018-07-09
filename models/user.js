const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
