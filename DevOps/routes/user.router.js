const express = require("express");
const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
