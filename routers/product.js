let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let productManager = require("../services/managers/productManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");
let imageManager = require("../services/managers/imageManager");
const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let {
      _id,
      code,
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
      code,
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
  let operation = productManager.findItem(id).then((product) => {
    return productManager.removeItem(id).then(() => {
      let imageUrls = (product && product.imageUrls) || [];
      console.log("imageUrls", imageUrls);
      let imagesToRemove = imageUrls.map((imageId) => {
        console.log("image to delete", imageId);
        if (!imageId) {
          return Promise.resolve(null);
        }
        return imageManager.removeItem(imageId);
      });
      return Promise.all(imagesToRemove);
    });
  });
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let {
    id,
    title,
    code,
    description,
    categoryId,
    size,
    parts,
    options,
    imageUrls,
    price,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, title, categoryId, price, code }, [
    "id",
    "title",
    "code",
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
    code,
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
    code,
    options,
    imageUrls,
    price,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ title, categoryId, price, code }, [
    "title",
    "code",
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
    code,
    parts,
    options,
    imageUrls,
    price,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.productRouter = router;
module.exports.productModelName = productManager.getModelName();
