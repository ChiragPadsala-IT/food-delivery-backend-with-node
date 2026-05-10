const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get Token

    const token = req.headers["authorization"].split(" ")[1];

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.body.user_id = payload.id;

    next();
  } catch (error) {
    console.log(`${error}`.bgRed);
    res
      .status(500)
      .json({ success: false, message: "Error in auth api", error });
  }
};
