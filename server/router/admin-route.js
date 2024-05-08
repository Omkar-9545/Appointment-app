const express = require("express");
const { getNotification, deleteNotification } = require("../controllers/doc-controller");
const {seeNotification} = require("../controllers/doc-controller");
const getAllUser = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();


//to get all notification from the database
router.route("/notification").get(getNotification);

router.route("/get-notification").get(seeNotification);

router.route("/delete-notification").get(deleteNotification)

router.route('/users').get(authMiddleware,adminMiddleware,getAllUser)

module.exports = router;