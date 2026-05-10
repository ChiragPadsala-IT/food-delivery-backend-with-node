const {
  getUserService,
  updateUserService,
} = require("../services/user.service.js");

const GetUserController = async (req, res) => {
  try {
    const user = await getUserService(req.body.user_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in get user api",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await getUserService(req.body.user_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { username, address, phone } = req.body;

    const updateRes = await updateUserService(
      req.body.user_id,
      username,
      address,
      phone,
    );

    if (!updateRes) {
      return res.status(500).json({
        success: false,
        message: "Something went worng for update user",
      });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "User update successfully",
        updateUser: updateRes,
      });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in update user api",
      error,
    });
  }
};

module.exports = { GetUserController, updateUserController };
