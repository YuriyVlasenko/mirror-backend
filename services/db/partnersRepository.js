const Repository = require("./Repository");

module.exports = new Repository("partner", {
  name: String,
  address: String,
  contacts: String,
  city: String,
  region: String,
  imageUrl: String,
});
