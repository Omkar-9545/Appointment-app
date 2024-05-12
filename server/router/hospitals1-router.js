const express = require("express");
const h1 = require("../controllers/hospitals1-controller");
const h2 = require("../controllers/hospitals2-controller");
const h3 = require("../controllers/hospitals3-controller");
const docController = require("../controllers/doc-controller");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const docSchema = require("../validators/doc-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/kolhapur").get(authMiddleware,h1.hospitals1);

router.route('/gadhinglaj').get(authMiddleware,h2.hospitals2);

router.route("/sangli").get(authMiddleware,h3.hospitals3);

router.route("/apply-doctor/:id").post(validate(docSchema), docController);

router.route("/kolhapur/:id/doctors").get(authMiddleware, h1.getallDoc1);

router.route("/gadhinglaj/:id/doctors").get(authMiddleware, h2.getallDoc2);

router.route("/sangli/:id/doctors").get(authMiddleware, h3.getallDoc3);

module.exports = router;