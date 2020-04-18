let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let galleryManager = require("../services/managers/galleryManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let { _id, title, imageUrl } = rawData;
    return {
      id: _id,
      title,
      imageUrl,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = galleryManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let { id, title, imageUrl } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, title }, ["id", "title"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.updateItem({
    id,
    title,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { title, imageUrl } = req.body || {};
  let error = ensureThatFieldsHasValue({ title, imageUrl }, ["title"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.createItem({
    title,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.galleryRouter = router;
module.exports.galleryModelName = galleryManager.getModelName();
