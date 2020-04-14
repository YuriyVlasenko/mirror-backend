const Repository = require("./Repository");

module.exports = new Repository("productCategory", {
  name: String,
  title: String,
  imageUrl: String,
});
