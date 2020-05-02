let repository = require("../db/galleryRepository");

class GalleryManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { title, imageUrl, order } = data;
    return repository.createItem({ title, imageUrl, order });
  }
  updateItem(data) {
    let { id, title, imageUrl, order } = data;
    return repository.updateItem({ id, title, imageUrl, order });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
  findItem(id) {
    return repository.findItem(id);
  }
}

module.exports = new GalleryManager();
