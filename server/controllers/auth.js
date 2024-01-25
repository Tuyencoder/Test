import * as config from "../config.js";
import User from "../models/auth.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const tokenAndUserResponse = (req, res, user) => {
  // create token
  const jwtToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
  // create refresh token
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  // hide fields
  user.password = undefined;
  user.resetCode = undefined;
  // send response
  return res.json({
    user,
    token: jwtToken,
    refreshToken,
    role: user.role[0],
  });
};

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("check mail and password", email, password);

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    if (password && password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters long",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    tokenAndUserResponse(req, res, newUser);
  } catch (error) {
    console.log(error);
    return res.json({ err: "Something went wrong !" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "not found email ! Register first !" });
    }
    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "password is wrong" });
    }
    tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.json({ err: "Something went wrong !" });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    console.log("===> ", user);
    // res.json(user);
    return res.json({
      user,
      role: user.role[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};