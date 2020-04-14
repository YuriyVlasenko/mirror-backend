let repository = require("../db/partnersRepository");

class GalleryManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let { name, address, contacts, city, region, imageUrl } = data;
    return repository.createItem({
      name,
      address,
      contacts,
      city,
      region,
      imageUrl,
    });
  }
  updateItem(data) {
    let { id, name, address, contacts, city, region, imageUrl } = data;
    return repository.updateItem({
      id,
      name,
      address,
      contacts,
      city,
      region,
      imageUrl,
    });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
}

module.exports = new GalleryManager();
