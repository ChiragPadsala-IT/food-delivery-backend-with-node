const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.body) req.body = {};

    // Get Token
    const token = req.headers["authorization"].split(" ")[1];

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const payload = jwt.verify(token, JWT_SECRET_KEY);

    console.log(`${payload.id}`);

    req.body.user_id = payload.id;

    console.log(`Auth middleware successfully`.bgGreen);
    next();
  } catch (error) {
    console.log(`${error}`.bgRed);
    res
      .status(500)
      .json({ success: false, message: "Error in auth api", error });
  }
};
