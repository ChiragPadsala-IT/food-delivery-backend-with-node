const userModel = require("../models/auth.model");
const restaurantModel = require("../models/restaurant.model");

const createRestaurantService = async (
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
) => {
  const user = await userModel.findById(user_id).select("email");

  if (!user) throw new Error("User not found while creating restaurant");

  const restaurantExist = await restaurantModel.findOne({ email: user.email });

  if (restaurantExist) throw new Error("Already has a restaurant created");

  const newRestaurant = await restaurantModel.create({
    email: user.email,
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
  });

  if (!newRestaurant)
    throw new Error("Something went wrong in create restaurant service");

  return newRestaurant;
};

module.exports = { createRestaurantService };
