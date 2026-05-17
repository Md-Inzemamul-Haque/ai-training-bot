import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    preferredLanguage: {
      type: String,
      default: "English",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);