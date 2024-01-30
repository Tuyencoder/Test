const config = require("../config");
const User = require("../models/auth");
const { nanoid } = require("nanoid");
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../helpers/auth");

const tokenAndUserResponse = (req, res, user) => {
  const jwtToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  user.password = undefined;
  user.resetCode = undefined;
  return res.json({
    user,
    token: jwtToken,
    refreshToken,
    role: user.role[0],
  });
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "not found email ! Register first !" });
    }
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

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    return res.json({
      user,
      role: user.role[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { tokenAndUserResponse, register, login, currentUser };
