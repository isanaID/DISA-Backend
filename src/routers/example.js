const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { example } = require("../apps/example");

router.route("/example").get(verifyUser, (req, res) => {
  req = adaptRequest(req);
  example
    .exampleGetWithAuth({
      data: req,
    })
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      sendResponse(res, error);
    });
});

module.exports = router;
