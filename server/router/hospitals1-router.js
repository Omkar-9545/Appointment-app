const express = require("express");
const hospitals1 = require("../controllers/hospitals1-controller");
const hospitals2 = require("../controllers/hospitals2-controller");
const hospitals3 = require("../controllers/hospitals3-controller");
const docController = require("../controllers/doc-controller");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const docSchema = require("../validators/doc-validator");

router.route("/kolhapur").get(hospitals1);

router.route('/gadhinglaj').get(hospitals2);

router.route("/sangli").get(hospitals3);

router.route("/apply-doctor").post(validate(docSchema),docController.docController);

module.exports = router;