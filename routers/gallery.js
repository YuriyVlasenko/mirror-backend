let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let galleryManager = require("../services/managers/galleryManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");
let { checkAuthToken } = require('./auth')
let imageManager = require("../services/managers/imageManager");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let { _id, title, imageUrl, order } = rawData;
    return {
      id: _id,
      title,
      order,
      imageUrl,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = galleryManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/:id",  checkAuthToken, (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.findItem(id).then((galleryItem) => {
    return galleryManager.removeItem(id).then(() => {
      let imageId = galleryItem && galleryItem.imageUrl;
      if (imageId) {
        return imageManager.removeItem(imageId);
      }
      return Promise.resolve(true);
    });
  });
  handleOperationResult(operation, res, () => true);
});

router.put("/", checkAuthToken, (req, res) => {
  let { id, title, imageUrl, order } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, title }, ["id", "title"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.updateItem({
    id,
    title,
    order,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", checkAuthToken, (req, res) => {
  let { title, imageUrl, order } = req.body || {};
  let error = ensureThatFieldsHasValue({ title, imageUrl }, ["title"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = galleryManager.createItem({
    title,
    imageUrl,
    order,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.galleryRouter = router;
module.exports.galleryModelName = galleryManager.getModelName();
