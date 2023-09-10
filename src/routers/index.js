const express = require("express");
const router = express.Router();

router.use(require("./auth"));
router.use(require("./example"));
router.use(require("./destinasi"));
router.use(require("./ulasan"));
router.use(require("./reward"));
router.use(require("./history"));

module.exports = router;
