const { signUpService, loginService } = require("../services/auth.service");

const signUpController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide all required field" });
    }

    const user = await signUpService(username, email, password, address, phone);

    if (!user) {
      return res
        .status(500)
        .json({ success: fasle, message: "Something went wrong" });
    }

    res
      .status(200)
      .json({ success: true, message: "Data recieved", user: user });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in sign up api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide all required field" });
    }

    const loginResponse = await loginService(email, password);

    if (!loginResponse) {
      return res
        .status(500)
        .json({ success: false, message: "Incorrect email and password" });
    }

    const loginReponse = await loginService(email, password);

    if (!loginReponse) {
      return res
        .status(500)
        .json({ success: fasle, message: "Something went wrong" });
    }
    res.status(200).json({ success: true, message: "Login Successful" });
  } catch (error) {
    console.log(`$error`.bgRed);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = { signUpController, loginController };
