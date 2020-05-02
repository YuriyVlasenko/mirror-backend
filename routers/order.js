let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let orderManager = require("../services/managers/orderManager");
let productManager = require("../services/managers/productManager");
let { ensureThatFieldsHasValue } = require("../services/validators");
let { handleOperationResult } = require("../services/httpHelpers");

const calculateOrderProductsData = (orderProductsRaw) => {
  let orderProductsPromises = orderProductsRaw.map((orderProduct) => {
    return productManager.getPrice(orderProduct.id).then((price) => {
      return {
        id: orderProduct.id,
        price: price,
        count: orderProduct.count,
        total: price * (orderProduct.count || 0),
      };
    });
  });
  return Promise.all(orderProductsPromises).then((orderProducts) => {
    let items = orderProducts.filter((orderProduct) => {
      return Boolean(orderProduct.total);
    });
    let total = 0;
    items.forEach((p) => {
      total += p.total;
    });
    return {
      orderProducts: items,
      total,
    };
  });
};

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
      status,
      date,
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
      status: status || 1,
      total,
      date,
      products: (products || []).map((product) => {
        return {
          id: product.id,
          price: product.price,
          total: product.total,
          count: product.count,
        };
      }),
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
    products,
    status,
  } = req.body || {};
  let error = ensureThatFieldsHasValue({ id, buyer, phone, city, region }, [
    "id",
    "buyer",
    "phone",
    "city",
    "region",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
  let operation = calculateOrderProductsData(products).then((data) => {
    console.log("orderProducts data", data);
    return orderManager.updateItem({
      id,
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      status,
      total: data.total,
      date: new Date().toISOString(),
      products: data.orderProducts,
    });
  });
  handleOperationResult(operation, res, () => true);
});

router.post("/", (req, res) => {
  let { buyer, phone, city, region, deliveryDepartment, notes, products } =
    req.body || {};
  let error = ensureThatFieldsHasValue({ buyer, phone, city, region }, [
    "buyer",
    "phone",
    "city",
    "region",
  ]);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }

  let operation = calculateOrderProductsData(products).then((data) => {
    return orderManager.createItem({
      buyer,
      phone,
      city,
      region,
      deliveryDepartment,
      notes,
      total: data.total,
      date: new Date().toISOString(),
      products: data.orderProducts,
    });
  });
  handleOperationResult(operation, res, (data) => {
    return (data._id + "").substr(-6);
  });
});

module.exports.orderRouter = router;
module.exports.orderModelName = orderManager.getModelName();
