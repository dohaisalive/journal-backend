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
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  profileImage: { type: String },
  headerImg: { type: String },
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  bio: { type: String },
});

UserSchema.plugin(uniqueValidator);
module.exports = model("User", UserSchema);
