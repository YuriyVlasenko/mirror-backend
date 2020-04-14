let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productOptionsManager = require("../services/managers/productOptionsManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let { _id, name } = rawData;
    return {
      id: _id,
      name,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = productOptionsManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/", (req, res) => {
  let { id } = req.body || {};
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productOptionsManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let { id, name } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, name }, ["id", "name"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productOptionsManager.updateItem({ id, name });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { name } = req.body || {};
  let error = ensureThatFieldsHasValue({ name }, ["name"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productOptionsManager.createItem({ name });
  handleOperationResult(operation, res, () => true);
});

module.exports.productOptionsRouter = router;
module.exports.productOptionsModelName = productOptionsManager.getModelName();
