const express = require("express");
const hospitals = require("../controllers/hospital-controller");
const router = express.Router();

router.route("/services").get(hospitals);

module.exports = router;