const express = require("express");
const hospitals1 = require("../controllers/hospitals1-controller");
const hospitals2 = require("../controllers/hospitals2-controller");
const hospitals3 = require("../controllers/hospitals3-controller");
const router = express.Router();

router.route("/kolhapur").get(hospitals1);

router.route('/gadhinglaj').get(hospitals2);

router.route("/sangli").get(hospitals3);

module.exports = router;