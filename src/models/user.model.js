import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "user name is required!"],
      lowercase: true,
      minLength: [5, "user name must be atleast 5 character!"],
      maxLength: [50, "user name must be atleast 5 character!"],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this.id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  },

  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },

  
};

export default mongoose.model("User", userSchema);
