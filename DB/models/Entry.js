const { model, Schema } = require("mongoose");

const EntrySchema = new Schema({
  date: { type: Date },
  type: { type: String },
  title: { type: String },
  body: { type: String },
  feeling: { type: String },
  health: { type: String },
  weather: { type: String },
  location: {
    lat: { type: Number, default: 0.0 },
    lng: { type: Number, default: 0.0 },
  },
  attachments: { type: Array },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String },
});

module.exports = model("Entry", EntrySchema);
