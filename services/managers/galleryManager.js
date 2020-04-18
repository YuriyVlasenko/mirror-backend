let repository = require("../db/galleryRepository");

class GalleryManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { title, imageUrl } = data;
    return repository.createItem({ title, imageUrl });
  }
  updateItem(data) {
    let { id, title, imageUrl } = data;
    return repository.updateItem({ id, title, imageUrl });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new GalleryManager();
