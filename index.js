const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");

const authRoute = require("./src/routes/auth.route");

// don env configuration
const envPath = path.join(__dirname, ".env");
dotenv.config({ path: envPath });

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

// app listen
app.listen(PORT, () => {
  console.log(`Service running on ${PORT}`.bgGreen);
});
