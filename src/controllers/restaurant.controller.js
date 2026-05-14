const {
  createRestaurantService,
  getAllRestaurantService,
} = require("../services/restaurant.service");

const createRestaurantController = async (req, res) => {
  try {
    const {
      user_id,
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res
        .status(500)
        .json({ success: false, message: "Title and Coords are required" });
    }

    const newRestaurant = await createRestaurantService(
      user_id,
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      coords,
    );

    if (!newRestaurant) {
      return res.status(500).json({
        success: false,
        message: "Something wrong while create new restaurant",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Restaurant created successfully" });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in create restaurant api",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const allRestaurant = await getAllRestaurantService();

    if (!allRestaurant)
      return res
        .status(404)
        .json({ success: true, message: "No restaurant found" });

    res.status(200).json({
      success: true,
      totalCount: allRestaurant.length,
      restaurants: allRestaurant,
    });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in get all restaurant api",
      error,
    });
  }
};

module.exports = { createRestaurantController, getAllRestaurantController };
