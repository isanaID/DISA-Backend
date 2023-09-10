const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { history } = require("../apps/history");

router.route("/history").get((req, res) => {
  req = adaptRequest(req);
  console.log({ param: req.queryParams });
  history
    .listReward(req.queryParams)
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      sendResponse(res, error);
    });
});

router.route("/history").post((req, res) => {
  req = adaptRequest(req);
  history
    .createReward(req.body)
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      sendResponse(res, error);
    });
});
module.exports = router;
