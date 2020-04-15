let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productManager = require("../services/managers/productManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let {
      _id,
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    } = rawData;
    return {
      id: _id,
      title,
      description,
      categoryId,
      size,
      parts,
      options,
      imageUrls,
      price,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = productManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let {
    id,
    title,
    description,
    categoryId,
    size,
    parts,
    options,
    imageUrls,
    price,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, title, categoryId, price }, [
    "id",
    "title",
    "categoryId",
    "price",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productManager.updateItem({
    id,
    title,
    description,
    categoryId,
    size,
    parts,
    options,
    imageUrls,
    price,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let {
    title,
    description,
    categoryId,
    size,
    parts,
    options,
    imageUrls,
    price,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ title, categoryId, price }, [
    "title",
    "categoryId",
    "price",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = productManager.createItem({
    title,
    description,
    categoryId,
    size,
    parts,
    options,
    imageUrls,
    price,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.productRouter = router;
module.exports.productModelName = productManager.getModelName();
