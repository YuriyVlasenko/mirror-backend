const Repository = require("./Repository");

module.exports = new Repository("product", {
  title: String,
  code: String,
  description: String,
  categoryId: String,
  size: { width: String, height: String, length: String },
  parts: [String],
  options: [String],
  imageUrls: [String],
  price: Number,
});
