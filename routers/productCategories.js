let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productCaregoriesManager = require("../services/managers/productCaregoriesManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let { _id, name, title, imageUrl } = rawData;
    return {
      id: _id,
      name,
      title,
      imageUrl,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = productCaregoriesManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/", (req, res) => {
  let { id } = req.body || {};
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productCaregoriesManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let { id, name, title, imageUrl } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, name, title }, [
    "id",
    "name",
    "title",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productCaregoriesManager.updateItem({
    id,
    name,
    title,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { name, title, imageUrl } = req.body || {};
  let error = ensureThatFieldsHasValue({ name, title }, ["name", "title"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productCaregoriesManager.createItem({
    name,
    title,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.productCategoriesRouter = router;
module.exports.productCategoriesModelName = productCaregoriesManager.getModelName();
