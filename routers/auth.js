let express = require("express");
var httpStatus = require("http-status-codes");
let router = express.Router();
let userManager = require("../services/managers/userManager");
let { secretKey } = require("../config.json");
var jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  let { login, password } = req.body;
  return userManager
    .findItem(login)
    .then((user) => {
      if (!user) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      if (user.password === password) {
        var token = jwt.sign({ login }, secretKey);
        return res.send({ token });
      }
      return res.sendStatus(httpStatus.BAD_REQUEST);
    })
    .catch((error) => {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    });
});

const checkAuthToken = (req, res, next) => {
  let authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
  let parts = authorizationHeader.split(" ");
  if (parts.length !== 2) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
  let token = parts[1];
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (!decoded) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    next();
  });
};

module.exports.checkAuthToken = checkAuthToken;
module.exports.authRouter = router;
module.exports.authModelName = "auth";
