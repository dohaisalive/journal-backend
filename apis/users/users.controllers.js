const User = require("../../DB/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../../config/keys");
const fs = require("fs");

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
    const users = await User.find().populate("friends");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");
    console.log("user: " + user);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


exports.uploadImage = async (req, res, next) => {
  const date = Date.now();
  const link = `./media/userMedia/${date}.jpeg`;
  req.pipe(fs.createWriteStream(link));
  //dont store the whole link the the DB, only the relevant path.
  const resLink = `/media/userMedia/${date}.jpeg`;
  console.log("new link: " + resLink);
  res.status(200).send(resLink);
};
