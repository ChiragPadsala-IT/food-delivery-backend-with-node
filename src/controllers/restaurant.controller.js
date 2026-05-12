const { createRestaurantService } = require("../services/restaurant.service");

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

module.exports = { createRestaurantController };
