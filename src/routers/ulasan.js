const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { ulasan } = require("../apps/ulasan");

router
  .route("/ulasan")
  .get((req, res) => {
    req = adaptRequest(req);
    ulasan
      .listUlasan({
        data: req,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  })
  .post(verifyUser, (req, res) => {
    req = adaptRequest(req);
    ulasan
      .createUlasan({
        data: req.body,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  });

router.route("/ulasan/:id").delete(verifyUser, (req, res) => {
  req = adaptRequest(req);
  ulasan
    .deleteUlasan(req.pathParams.id)
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      sendResponse(res, error);
    });
});

module.exports = router;
