// don env configuration
const path = require("path");
const dotenv = require("dotenv");
const envPath = path.join(__dirname, ".env");
dotenv.config({ path: envPath });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./src/config/db.js");

const authRoute = require("./src/routes/auth.route.js");
const userRoute = require("./src/routes/user.route.js");
const restaurantRoute = require("./src/routes/restaurant.route.js");

// DB connection
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
// URL => http://localhost:8080

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);

// app listen
app.listen(3000, () => {
  console.log(`Service running on ${PORT}`.bgGreen);
});
