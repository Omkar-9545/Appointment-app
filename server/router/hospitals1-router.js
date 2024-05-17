const express = require("express");
const h1 = require("../controllers/hospitals1-controller");
const h2 = require("../controllers/hospitals2-controller");
const h3 = require("../controllers/hospitals3-controller");
const docContrl = require("../controllers/doc-controller");
const router = express.Router();
const validate = require("../middlewares/validate-middleware");
const docSchema = require("../validators/doc-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const booking = require("../controllers/booking-controller");

router.route("/kolhapur").get(authMiddleware,h1.hospitals1);

router.route('/gadhinglaj').get(authMiddleware,h2.hospitals2);

router.route("/sangli").get(authMiddleware,h3.hospitals3);

router.route("/apply-doctor/:id").post(validate(docSchema), docContrl.docController);

router.route("/kolhapur/:id/doctors").get(authMiddleware, h1.getallDoc1);

router.route("/gadhinglaj/:id/doctors").get(authMiddleware, h2.getallDoc2);

router.route("/sangli/:id/doctors").get(authMiddleware, h3.getallDoc3);

router.route("/:id/doc/profile").get(authMiddleware, docContrl.docProfile)

router.route("/:id/doc/profile/update").patch(authMiddleware, docContrl.updateProfile)

router.route('/:id/booking').get(authMiddleware, booking.getDocInfo)

router.route('/available').post(authMiddleware,booking.checkAvailablility)

module.exports = router;