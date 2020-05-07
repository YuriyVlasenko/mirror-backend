let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productCaregoriesManager = require("../services/managers/productCaregoriesManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");
let imageManager = require("../services/managers/imageManager");
let { checkAuthToken } = require("./auth");

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

router.delete("/:id", checkAuthToken, (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }

  let operation = productCaregoriesManager
    .findItem(id)
    .then((productCategory) => {
      return productCaregoriesManager.removeItem(id).then(() => {
        let imageId = productCategory && productCategory.imageUrl;
        if (imageId) {
          return imageManager.removeItem(imageId);
        }
        return Promise.resolve(true);
      });
    });
  handleOperationResult(operation, res, () => true);
});

router.put("/", checkAuthToken, (req, res) => {
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

router.post("/", checkAuthToken, (req, res) => {
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
