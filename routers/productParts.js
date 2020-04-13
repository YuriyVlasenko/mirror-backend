let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productPartsManager = require("../services/managers/productPartsManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

router.get("/", (req, res) => {
  let operation = productPartsManager.getItems();
  handleOperationResult(operation, res);
});

router.delete("/", (req, res) => {
  let { id } = req.body || {};
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productPartsManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let { id, name } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, name }, ["id", "name"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productPartsManager.updateItem({ id, name });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { name } = req.body || {};
  let error = ensureThatFieldsHasValue({ name }, ["name"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productPartsManager.createItem({ name });
  handleOperationResult(operation, res, () => true);
});

module.exports.productPartsRouter = router;
module.exports.productPartsModelName = productPartsManager.getModelName();
