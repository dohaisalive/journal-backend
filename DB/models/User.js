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
    default: "https://cdn-icons-png.flaticon.com/512/634/634795.png",
  },
  headerImg: {
    type: String,
    default:
      "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background.jpg",
  },
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  bio: { type: String, default: "my bio" },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  this.displayname = this.username;
  next();
});
module.exports = model("User", UserSchema);
