const express = require("express");
const { getNotification, deleteNotification } = require("../controllers/doc-controller");
const {seeNotification} = require("../controllers/doc-controller");
const getAllUser = require("../controllers/admin-controller");
const router = express.Router();


//to get all notification from the database
router.route("/notification").get(getNotification);

router.route("/get-notification").get(seeNotification);

router.route("/delete-notification").get(deleteNotification)

router.route('/users').get(getAllUser)

module.exports = router;