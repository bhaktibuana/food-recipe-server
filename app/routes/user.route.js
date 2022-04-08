const express = require("express");
const userMiddleware = require("../middlewares/user.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", userMiddleware.loginValidation, userController.login);
router.post("/register", userMiddleware.registerValidation, userController.register);

module.exports = router;
