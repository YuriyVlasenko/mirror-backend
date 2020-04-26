let repository = require("../db/orderRepository");

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
      date,
    } = data;
    return repository.createItem({
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      date,
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
      date,
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
      date,
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
