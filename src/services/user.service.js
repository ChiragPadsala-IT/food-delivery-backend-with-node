const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

const getUserService = async (id) =>
  await userModel.findById(id).select("-_id");

const updateUserService = async (id, username, address, phone) =>
  await userModel
    .findByIdAndUpdate(
      id,
      { username, address, phone },
      { returnDocument: "after" },
    )
    .select("-_id");

const generateOtpService = async (email) => {
  console.log(`generate opt run ${email}`.bgGreen);
  const user = await userModel.findOne({ email });

  if (!user) throw new Error("Invalid credential");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;

  user.otpExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  return otp;
};

const verifyOtpService = async (email, otp) => {
  const user = await userModel.findOne({ email });

  if (!user) throw new Error("User not found");

  if (user.otpExpire < Date.now()) throw new Error("Otp expired");

  if (user.otp !== otp) throw new Error("Invalid Otp");

  user.otpVerifyStatus = true;

  await user.save();

  return true;
};

const resetPasswordService = async (email, newPassword) => {
  const user = await userModel.findOne({ email }).select("+password");

  if (!user.otpVerifyStatus)
    throw new Error("Something went wrong password service");

  // passwrod hashing
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashPassword;

  await user.save();

  return true;
};

const deleteUserService = async (id) => {
  const res = await userModel.findByIdAndDelete(id);

  if (!res) throw new Error("User not existed");

  return res.email;
};

module.exports = {
  getUserService,
  updateUserService,
  generateOtpService,
  verifyOtpService,
  resetPasswordService,
  deleteUserService,
};
