let repository = require("../db/userRepository");

class UserManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  findItem(login) {
    return repository.findItemByParams({ login });
  }
}

module.exports = new UserManager();
