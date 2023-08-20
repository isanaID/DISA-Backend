const express = require("express");
const router = express.Router();

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { auth } = require("../apps/auth");

router.route("/auth/login").post((req, res) => {
  req = adaptRequest(req);
  auth
    .login({
      req: req,
    })
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      console.log(error);
      sendResponse(res, error);
    });
});

router.route("/auth/register").post((req, res) => {
  req = adaptRequest(req);
  console.log(req);
  auth
    .register({
      req: req,
    })
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      console.log(error);
      sendResponse(res, error);
    });
});

module.exports = router;
