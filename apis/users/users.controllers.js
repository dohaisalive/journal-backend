const User = require("../../DB/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../../config/keys");

exports.signin = async (req, res, next) => {
  try {
    const payload = {
      _id: req.user._id,
      username: req.user.username,
      //profileImage: req.user.profileImage,
      exp: Date.now() + JWT_EXPIRATION,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      _id: req.user._id,
      username: req.user.username,
      //profileImage: req.user.profileImage,
      exp: Date.now() + JWT_EXPIRATION,
    };
    const token = jwt.sign(payload, JWT_SECRET);

    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.files) {
      //req.body.profileImage = `/media/${req.file.filename}`;
    }
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
