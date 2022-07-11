const { model, Schema } = require("mongoose");

const EntrySchema = new Schema({
  date: { type: String },
  title: { type: String },
  location: {
    lat: { type: Number, default: 0.0 },
    lng: { type: Number, default: 0.0 },
  },

  type: { type: String },
  body: { type: String },

  feeling: { type: String },
  health: { type: String },
  weather: { type: String },

  attachments: [{ type: String }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isPriv: { type: Boolean }, //public or private
});

module.exports = model("Entry", EntrySchema);
