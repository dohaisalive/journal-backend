const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  profileImage: {
    type: String,
    default: "/media/defaults/pfp.png",
  },
  headerImg: {
    type: String,
    default: "/media/defaults/header.jpg",
  },
  notifications: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bio: { type: String, default: "my bio" },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function (next) {
  this.displayname = this.username;
  next();
});
module.exports = model("User", UserSchema);
