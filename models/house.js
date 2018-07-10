const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./user.js");

const houseSchema = new Schema({
  type: String,
  image: String,
  price: Number,
  size: Number,
  location: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: false }
  // house: [UserSchema]
});

module.exports = mongoose.model("House", houseSchema);
