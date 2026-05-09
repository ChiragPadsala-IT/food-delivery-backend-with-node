const mongoose = require("mongoose");
const colors = require("colors");

// db connection
const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("Database Connect Successfully...".bgBlue);
    console.log(res.connection.host);
  } catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = connectDB;
