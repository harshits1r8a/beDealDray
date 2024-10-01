import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "Name is required!"],
      lowercase: true,
      minLength: [5, "Name must be atleast 5 character!"],
      maxLength: [50, "Name must be atleast 5 character!"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      rrequired: [true, "email is required!"],
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password must be atleast 8 character!"],
      select: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);



export const User = mongoose.model("User", userSchema);
