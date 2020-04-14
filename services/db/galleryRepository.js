const Repository = require("./Repository");

module.exports = new Repository("gallery", {
  name: String,
  imageUrl: String,
});
