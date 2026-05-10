const express = require("express");
const {
  GetUserController,
  updateUserController,
} = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Get User Data
router.post("/get-user", authMiddleware, GetUserController);

// Update User
router.put("/update-user", authMiddleware, updateUserController);

module.exports = router;
