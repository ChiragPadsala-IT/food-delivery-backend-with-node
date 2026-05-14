const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  createRestaurantController,
  getAllRestaurantController,
} = require("../controllers/restaurant.controller.js");

const router = express.Router();

// Create Restaurant
router.post("/create", authMiddleware, createRestaurantController);

// Get All Restaurant
router.get("/get-all", getAllRestaurantController);

module.exports = router;
