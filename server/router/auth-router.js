const express = require("express");
const authcontrollers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const { singupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// router.get('/',(req, res) => {
//     res.status(200).send(`Welcome to the application by Omki using router`);
// });

router.route('/').get(authcontrollers.home);

router.route('/register').post(validate(singupSchema),authcontrollers.register);

router.route('/login').post(validate(loginSchema),authcontrollers.login);

router.route('/user').get(authMiddleware, authcontrollers.authctrl);

module.exports = router;