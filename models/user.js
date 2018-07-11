const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const House = require("./house.js");
//create a user with username and encrypted password
const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String },
  username: { type: String, required: true }
  // house: [House.schema]
});

module.exports = mongoose.model("User", UserSchema);
