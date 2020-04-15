let repository = require("../db/productCategoriesRepository");

class ProductCategoriesManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { name, title, imageUrl } = data;
    return repository.createItem({ name, title, imageUrl });
  }
  updateItem(data) {
    console.log("updateItem", data);
    let { id, name, title, imageUrl } = data;
    return repository.updateItem({ id, name, title, imageUrl });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new ProductCategoriesManager();
