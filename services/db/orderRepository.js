const Repository = require("./Repository");
let mongoose = require("mongoose");
var OrderProduct = new mongoose.Schema({
  id: String,
  count: Number,
  price: Number,
  total: Number,
});

module.exports = new Repository("order", {
  date: String,
  buyer: String,
  phone: String,
  city: String,
  region: String,
  deliveryDepartment: String,
  notes: String,
  total: Number,
  products: [OrderProduct],
});
