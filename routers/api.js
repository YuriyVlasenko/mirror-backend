let { productPartsRouter, productPartsModelName } = require("./productParts");
let config = require("../config.json");

const applyRouters = (app) => {
  app.use(
    `/${config.apiUrlPrefix}/${productPartsModelName}`,
    productPartsRouter
  );
};

module.exports.applyRouters = applyRouters;
