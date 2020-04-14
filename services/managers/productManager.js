let repository = require("../db/galleryRepository");

class ProductManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let {
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    } = data;
    return repository.createItem({
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
