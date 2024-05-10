const express = require("express");
const adminCtrl = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();


//to get all notification from the database
router.route("/notification").get(adminCtrl.getNotification);

router.route("/get-notification").get(adminCtrl.seeNotification);

router.route("/delete-notification").get(adminCtrl.deleteNotification)

router.route('/users').get(authMiddleware, adminMiddleware, adminCtrl.getAllUser)

router.route("/users/:id").get(authMiddleware, adminMiddleware, adminCtrl.getUserbyId)

router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminCtrl.updateUser)

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminCtrl.deleteUser)

router.route("/doctors").get(authMiddleware, adminMiddleware, adminCtrl.getAllDoc);

router.route("/doctors/update/:id").patch(authMiddleware,adminMiddleware,adminCtrl.approveDoc)

module.exports = router;