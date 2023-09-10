const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { reward } = require("../apps/reward");

router
  .route("/reward")
  .get((req, res) => {
    req = adaptRequest(req);
    reward
      .listReward({
        data: req.queryParams,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  })
  .post((req, res) => {
    req = adaptRequest(req);
    reward
      .createReward({
        data: req.body,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  });

router
  .route("/reward/:id")
  .put(verifyUser, (req, res) => {
    req = adaptRequest(req);
    reward
      .updateReward({
        data: req.body,
        id: req.pathParams.id,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  })
  .delete(verifyUser, (req, res) => {
    req = adaptRequest(req);
    reward
      .deleteReward(req.pathParams.id)
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  })
  .get((req, res) => {
    req = adaptRequest(req);
    reward
      .showDestinasi({
        data: req.body,
        destinasiId: req.pathParams,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  });

module.exports = router;
