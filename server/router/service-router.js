const express = require("express");
const hospitals = require("../controllers/hospital-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/services").get(authMiddleware,hospitals);

module.exports = router;