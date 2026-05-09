const UserModel = require("../models/auth.model");

const signUpService = async (username, email, password, address, phone) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Already registered");
  }
  const newUser = await UserModel.create({
    username,
    email,
    password,
    address,
    phone,
  });
  return newUser;
};

const loginService = async (email, password) => {
  const user = await UserModel.findOne({ email }).select("password");

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = user.password == password;

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return true;
};

module.exports = { signUpService, loginService };
