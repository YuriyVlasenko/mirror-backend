let uuid = require("uuid");
var httpStatus = require("http-status-codes");

const handleOperationResult = (
  promise,
  response,
  mapResult = (result) => result
) => {
  promise
    .then((result) => {
      response.json(mapResult(result));
    })
    .catch((error) => {
      response.status(httpStatus.BAD_REQUEST).send(error);
    });
};

const generateId = () => {
  return uuid.v4().substr(-10);
};

module.exports.handleOperationResult = handleOperationResult;
module.exports.generateId = generateId;
