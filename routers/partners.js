let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let partnersManager = require("../services/managers/partnersManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let { _id, name, imageUrl, address, contacts, city, region } = rawData;
    return {
      id: _id,
      name,
      address,
      contacts,
      city,
      region,
      imageUrl,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = partnersManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = partnersManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let { id, name, address, contacts, imageUrl, city, region } = req.body || {};
  let error = ensureThatFieldsHasValue(
    { id, name, address, contacts, city, region },
    ["id", "name", "address", "contacts", "city", "region"]
  );
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = partnersManager.updateItem({
    id,
    name,
    address,
    contacts,
    city,
    region,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { name, address, contacts, city, region, imageUrl } = req.body || {};
  let error = ensureThatFieldsHasValue(
    { name, address, contacts, city, region },
    ["name", "address", "contacts", "city", "region"]
  );
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = partnersManager.createItem({
    name,
    address,
    contacts,
    city,
    region,
    imageUrl,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.partnerRouter = router;
module.exports.partnerModelName = partnersManager.getModelName();
