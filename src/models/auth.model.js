const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    address: {
      type: Array,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    usertype: {
      type: String,
      required: [true, "User type is requried"],
      default: "Client",
      enum: ["Client", "Admin", "Vendor", "Driver"],
    },

    profile: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    },

    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    otpVerifyStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
