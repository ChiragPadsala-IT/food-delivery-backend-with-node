const UserModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpService = async (username, email, password, address, phone) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Already registered");
  }

  // passwrod hashing
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    username,
    email,
    password: hashPassword,
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

  // password hashing
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate Token
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const EXPIRE_TOKEN = process.env.EXPIRE_TOKEN;

  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: EXPIRE_TOKEN,
  });

  return token;
};

module.exports = { signUpService, loginService };
