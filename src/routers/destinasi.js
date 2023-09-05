const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { destinasi } = require("../apps/destinasi");

router
  .route("/destinasi")
  .get((req, res) => {
    req = adaptRequest(req);
    destinasi
      .listDestinasi({
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
    destinasi
      .createDestinasi({
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
  .route("/destinasi/:id")
  .put(verifyUser, (req, res) => {
    req = adaptRequest(req);
    destinasi
      .updateDestinasi({
        data: req.body,
        destinasiId: req.pathParams,
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
    destinasi
      .deleteDestinasi({
        data: req.body,
        destinasiId: req.pathParams,
      })
      .then((result) => {
        sendResponse(res, result);
      })
      .catch((error) => {
        sendResponse(res, error);
      });
  })
  .get((req, res) => {
    req = adaptRequest(req);
    destinasi
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

router.route("/destinasi/visit").post(verifyUser, (req, res) => {
  req = adaptRequest(req);
  destinasi
    .visitDestinasi({
      data: req.body,
    })
    .then((result) => {
      sendResponse(res, result);
    })
    .catch((error) => {
      sendResponse(res, error);
    });
});

module.exports = router;
