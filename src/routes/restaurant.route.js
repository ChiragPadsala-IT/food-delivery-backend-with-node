const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  createRestaurantController,
} = require("../controllers/restaurant.controller.js");

const router = express.Router();

// Create Restaurant
router.post("/create", authMiddleware, createRestaurantController);

module.exports = router;
