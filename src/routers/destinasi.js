const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewares/userMiddleware");

const adaptRequest = require("../utils/adaptRequest");
const sendResponse = require("../utils/responseWeb/responseHandler");

const { destinasi } = require("../apps/destinasi");

const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter,
});

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
  .post(verifyUser, upload.single("image_url"), (req, res) => {
    req = adaptRequest(req);
    console.log({ file: req.file });
    destinasi
      .createDestinasi({
        data: { ...req.body, image_url: `public/${req?.file?.filename}` },
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
