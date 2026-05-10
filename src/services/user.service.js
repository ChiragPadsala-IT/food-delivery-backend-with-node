const userModel = require("../models/auth.model");

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

module.exports = { getUserService, updateUserService };
