const { model, Schema } = require("mongoose");

const NotificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String },
  post: { type: Schema.Types.ObjectId, ref: "Entry" },
});

module.exports = model("Notification", NotificationSchema);
