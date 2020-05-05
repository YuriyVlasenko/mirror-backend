const Repository = require("./Repository");

module.exports = new Repository("user", {
  login: String,
  password: String,
});
