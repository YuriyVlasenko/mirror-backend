let config = require("../config.json");
let { productPartsRouter, productPartsModelName } = require("./productParts");
let {
  productOptionsModelName,
  productOptionsRouter,
} = require("./productOptions");
let {
  productCategoriesModelName,
  productCategoriesRouter,
} = require("./productCategories");
let { galleryModelName, galleryRouter } = require("./gallery");
let { partnerModelName, partnerRouter } = require("./partners");

const applyRouters = (app) => {
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
};

module.exports.applyRouters = applyRouters;
