const express = require("express");
const hospitals1 = require("../controllers/hospitals1-controller");
const hospitals2 = require("../controllers/hospitals2-controller");
const hospitals3 = require("../controllers/hospitals3-controller");
const docController = require("../controllers/doc-controller");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const docSchema = require("../validators/doc-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/kolhapur").get(authMiddleware,hospitals1);

router.route('/gadhinglaj').get(authMiddleware,hospitals2);

router.route("/sangli").get(authMiddleware,hospitals3);

router.route("/apply-doctor").post(validate(docSchema),docController.docController);

module.exports = router;