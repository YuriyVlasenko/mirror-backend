let repository = require("../db/productRepository");

class ProductManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let {
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    } = data;
    return repository.createItem({
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    });
  }
  updateItem(data) {
    let {
      id,
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    } = data;
    return repository.updateItem({
      id,
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new ProductManager();
