const User = require("../../DB/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../../config/keys");

exports.signin = async (req, res, next) => {
  try {
    const payload = {
      _id: req.user._id,
      username: req.user.username,
      profileImage: req.user.profileImage,
      displayname: req.user.displayname,
      friends: req.user.friends,
      headerImg: req.user.headerImg,
      bio: req.user.bio,
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
      _id: newUser._id,
      username: newUser.username,
      profileImage: newUser.profileImage,
      displayname: newUser.displayname,
      friends: newUser.friends,
      headerImg: newUser.headerImg,
      bio: newUser.bio,
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

exports.updateUser = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.profileImage = `http://${req.get("host")}/media/${
    //     req.file.filename
    //   }`;
    // }

    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
