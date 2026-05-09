const express = require("express");
const {
  loginController,
  signUpController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
