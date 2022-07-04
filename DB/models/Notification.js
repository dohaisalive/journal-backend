const { model, Schema } = require("mongoose");

const NotificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String },
});

module.exports = model("Notification", NotificationSchema);
