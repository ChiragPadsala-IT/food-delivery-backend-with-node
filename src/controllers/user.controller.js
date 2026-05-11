const {
  getUserService,
  updateUserService,
  generateOtpService,
  verifyOtpService,
  resetPasswordService,
  deleteUserService,
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

    res.status(200).json({
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

const generateOtpController = async (req, res) => {
  try {
    const email = req.body.email;

    const otp = await generateOtpService(email);

    res
      .status(200)
      .json({ success: true, message: "Otp sent successfully", otp });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in generate otp api",
      error,
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const isVerify = await verifyOtpService(email, otp);

    if (!isVerify) res.status(500).json("Invalid Otp");

    res.status(200).json({ success: true, message: "Otp verified" });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in opt verify api",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const isPasswordUpdate = await resetPasswordService(email, newPassword);

    if (!isPasswordUpdate)
      throw new Error("Something went wrong in reset password controller");

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in reset password api",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const isUserDeleted = await deleteUserService(req.user_id);

    res
      .status(200)
      .json({
        success: true,
        message: `${isUserDeleted.email} deleted successfully`,
      });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in delete user api",
      error,
    });
  }
};
module.exports = {
  GetUserController,
  updateUserController,
  generateOtpController,
  verifyOtpController,
  resetPasswordController,
  deleteUserController,
};
