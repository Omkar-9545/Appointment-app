const express = require("express");
const hospitals1 = require("../controllers/hospitals1-controller");
const router = express.Router();

router.route("/kolhapur").get(hospitals1);

module.exports = router;