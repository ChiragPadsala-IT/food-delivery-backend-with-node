const express = require("express");
const {
  GetUserController,
  updateUserController,
  generateOtpController,
  verifyOtpController,
} = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Get User Data
router.post("/get-user", authMiddleware, GetUserController);

// Update User
router.put("/update-user", authMiddleware, updateUserController);

// Generate Otp
router.post("/generate-otp", generateOtpController);

// Verify Otp
router.post("/verify-otp", verifyOtpController);

module.exports = router;
