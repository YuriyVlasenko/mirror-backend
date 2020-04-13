let repository = require("../db/productPartsRepository");

class ProductPartsManager {
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

module.exports = new ProductPartsManager();
