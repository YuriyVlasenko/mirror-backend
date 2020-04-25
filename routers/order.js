let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let orderManager = require("../services/managers/orderManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");
const mapItems = (rawArray) => {
  const mapItem = (rawData) => {
    let {
      _id,
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    } = rawData;
    return {
      id: _id,
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total,
      products,
    };
  };
  return rawArray.map(mapItem);
};

router.get("/", (req, res) => {
  let operation = orderManager.getItems();
  handleOperationResult(operation, res, mapItems);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let error = ensureThatFieldsHasValue({ id }, ["id"]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = orderManager.removeItem(id);
  handleOperationResult(operation, res, () => true);
});

router.put("/", (req, res) => {
  let {
    id,
    buyer,
    phone,
    city,
    region,
    deliveryDepartment,
    notes,
    total,
    products,
  } = req.body || {};
  let error = ensureThatFieldsHasValue(
    { id, buyer, phone, city, region, total },
    ["id", "buyer", "phone", "city", "region", "total"]
  );
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = orderManager.updateItem({
    id,
    buyer,
    phone,
    city,
    region,
    deliveryDepartment,
    notes,
    total,
    products,
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let {
    buyer,
    phone,
    city,
    region,
    deliveryDepartment,
    notes,
    total,
    products,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ buyer, phone, city, region, total }, [
    "buyer",
    "phone",
    "city",
    "region",
    "total",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = orderManager.createItem({
    buyer,
    phone,
    city,
    region,
    deliveryDepartment,
    notes,
    total,
    products,
  });
  handleOperationResult(operation, res, () => true);
});

module.exports.productRouter = router;
module.exports.productModelName = orderManager.getModelName();
