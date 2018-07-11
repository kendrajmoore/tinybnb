const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

//create listing by type (e.g boat, yurt), image, price in dollars, size in sqft, location by nearest city, and availability
const houseSchema = new Schema({
  type: String,
  image: String,
  price: Number,
  size: Number,
  location: String,
  qty: Number
});

module.exports = mongoose.model("House", houseSchema);
