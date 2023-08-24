const express = require("express");
const router = express.Router();

router.use(require("./auth"));
router.use(require("./example"));
router.use(require("./destinasi"));

module.exports = router;
