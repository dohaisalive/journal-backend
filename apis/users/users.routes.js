const express = require("express");
const passport = require("passport");

const {
  signup,
  signin,
  getUsers,
  getUser,
  updateUser,
  uploadImage,
} = require("./users.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);
router.get("/user", getUser);
router.put("/updateUser/:userId", updateUser);
router.post("/uploadImage", uploadImage);

module.exports = router;
