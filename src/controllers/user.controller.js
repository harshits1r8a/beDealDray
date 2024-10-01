import emailValidator from "email-validator";

import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
// import path from "path";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  sequre: true,
};

const register = async (req, res, next) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return next(new AppError("All feilds are required!", 400));
    }

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return next(new AppError("Please enter valid email!", 400));
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(new AppError("User already Exsist!", 409));
    }

    // step 1 user create
    const user = await User.create({
      fullName,
      email,
      password,
      userName,
    });

    //  check user
    if (!user) {
      return next(
        new AppError("User registration failed!, please try again..", 400)
      );
    }

    await user.save();

    user.password = undefined;

    // Token to ensure no need to login after registration
    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registerd successfully",
      user,
    });
  } catch (error) {
    return next(
      new AppError(`Error in Registration controller :${error.message} `, 400)
    );
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All feilds are required!", 400));
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Password does not match!", 401));
    }
    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      user,
    });
  } catch (error) {
    return next(
      new AppError(`Error in LogIn controller : ${error.message}`, 400)
    );
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      sequre: true,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User loggedout successfully",
    });
  } catch (error) {
    return next(
      new AppError(`Error in LogOut controller : ${error.message}`, 400)
    );
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User detail",
      user,
    });
  } catch (error) {
    return next(
      new AppError(`Error in getProfile controller : ${error.message}`, 400)
    );
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return next(new AppError(`All feilds are required!`, 400));
    }

    const userId  = req.user.id;
    
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(
        new AppError(
          `Tocken is invalid or expired ! loggin again : `,
          400
        )
      );
    }

    const isPasswordValiid = await user.comparePassword(oldPassword);

    if (!isPasswordValiid) {
      return next(new AppError(`Please enter valid old password`, 400));
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(
      new AppError(`Error in changePassword controller : ${error.message}`, 400)
    );
  }
};

export { getProfile, login, logout, register, changePassword };
