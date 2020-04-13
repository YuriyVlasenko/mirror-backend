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

module.exports.handleOperationResult = handleOperationResult;
