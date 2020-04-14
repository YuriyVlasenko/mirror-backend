let repository = require("../db/productOptionsRepository");

class ProductOptionsManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { name } = data;
    return repository.createItem({ name });
  }
  updateItem(data) {
    let { id, name } = data;
    return repository.updateItem({ id, name });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new ProductOptionsManager();
