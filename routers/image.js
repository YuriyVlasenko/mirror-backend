let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let { handleOperationResult, generateId } = require("../services/httpHelpers");
let imageManager = require("../services/managers/imageManager");

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  imageManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  var itemId = generateId();
  let operation = imageManager.createItem(itemId, req);
  handleOperationResult(operation, res);
});

module.exports.imageRouter = router;
module.exports.imageModelName = imageManager.getModelName();
