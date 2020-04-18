let config = require("../config.json");
let { productPartsRouter, productPartsModelName } = require("./productParts");
let {
  productOptionsModelName,
  productOptionsRouter,
} = require("./productOptions");
let { imageModelName, imageRouter } = require("./image");
let {
  productCategoriesModelName,
  productCategoriesRouter,
} = require("./productCategories");
let { galleryModelName, galleryRouter } = require("./gallery");
let { partnerModelName, partnerRouter } = require("./partners");
let { productModelName, productRouter } = require("./product");
const applyRouters = (app) => {
  // TODO: remove after delployed
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    next();
  });
  app.use(
    `/${config.apiUrlPrefix}/${productPartsModelName}`,
    productPartsRouter
  );
  app.use(
    `/${config.apiUrlPrefix}/${productOptionsModelName}`,
    productOptionsRouter
  );
  app.use(
    `/${config.apiUrlPrefix}/${productCategoriesModelName}`,
    productCategoriesRouter
  );
  app.use(`/${config.apiUrlPrefix}/${galleryModelName}`, galleryRouter);
  app.use(`/${config.apiUrlPrefix}/${partnerModelName}`, partnerRouter);
  app.use(`/${config.apiUrlPrefix}/${productModelName}`, productRouter);
  app.use(`/${config.apiUrlPrefix}/${imageModelName}`, imageRouter);
};

module.exports.applyRouters = applyRouters;
