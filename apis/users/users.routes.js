const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

const {
  signup,
  signin,
  getUsers,
  getUser,
  updateUser,
  uploadImage,
} = require("./users.controllers");

//upload.array("profileImage", 2),

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);
router.get("/user", passport.authenticate("jwt", { session: false }), getUser);
router.put("/updateUser/:userId", updateUser);
router.post("/uploadImage", uploadImage);

module.exports = router;
