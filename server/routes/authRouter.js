const express = require("express");
const router = express.Router();
const authControl = require("../controllers/authController");

router.post("/register", authControl.register);
router.post("/login", authControl.login);
router.post("/logout", authControl.logout);
router.post("/refresh_token", authControl.generateAccessToken);

module.exports = router;
