const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = Schema({
  type: String,
  image: String,
  price: Number,
  size: Number,
  location: String
});

module.exports = mongoose.model("House", houseSchema);
