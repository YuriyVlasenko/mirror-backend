let repository = require("../db/galleryRepository");

class OrderManager {
  getModelName() {
    return repository.modelName;
  }
  getItems() {
    return repository.getAllItems();
  }
  createItem(data) {
    let {
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    } = data;
    return repository.createItem({
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    });
  }
  updateItem(data) {
    let {
      id,
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    } = data;
    return repository.updateItem({
      id,
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    });
  }
  removeItem(id) {
    return repository.removeItem(id);
  }
  findItem(id) {
    return repository.findItem(id);
  }
}

module.exports = new OrderManager();
