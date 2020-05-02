const Repository = require("./Repository");

module.exports = new Repository("gallery", {
  title: String,
  imageUrl: String,
  order: Number,
});
