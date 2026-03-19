const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: String,
  name: String,
  image: String,
  weight: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("Cart", cartSchema);