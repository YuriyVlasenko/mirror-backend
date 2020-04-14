let repository = require("../db/galleryRepository");

class GalleryManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { name, imageUrl } = data;
    return repository.createItem({ name, imageUrl });
  }
  updateItem(data) {
    let { id, name, imageUrl } = data;
    return repository.updateItem({ id, name, imageUrl });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new GalleryManager();
