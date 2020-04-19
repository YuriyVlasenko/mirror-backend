let mongoose = require("mongoose");

class Repository {
  constructor(modelName, schemaStructure) {
    this.modelName = modelName;
    let schema = new mongoose.Schema(schemaStructure);
    this._model = mongoose.model(this.modelName, schema);
  }
  getAllItems() {
    return this._model.find();
  }
  createItem(data) {
    return this._model.create(data);
  }
  updateItem(data) {
    return this._model.update({ _id: data.id }, data);
  }
  removeItem(id) {
    return this._model.deleteOne({ _id: id });
  }
  findItem(id) {
    return this._model.find({ _id: id }).then((items) => {
      if (items.length > 0) {
        return items[0];
      }
      return null;
    });
  }
}

module.exports = Repository;
