const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = Schema({
  type: String,
  image: String,
  price: Number,
  size: Number,
  location: String
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
