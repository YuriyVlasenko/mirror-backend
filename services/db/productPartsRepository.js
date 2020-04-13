//dbConnectionName
const modelName = "productPart";
let mongoose = require("mongoose");
let schema = new mongoose.Schema({ name: String });

let Model = mongoose.model(modelName, schema);

class Repository {
  modelName = modelName;
  getAllItems() {
    return Model.find();
  }
  createItem(data) {
    return Model.create(data);
  }
  updateItem(data) {
    return Model.update({ _id: data.id }, data);
  }
  removeItem(id) {
    return Model.deleteOne({ _id: id });
  }
  findItem(id) {
    return Model.find({ _id: id });
  }
}

module.exports = new Repository();
